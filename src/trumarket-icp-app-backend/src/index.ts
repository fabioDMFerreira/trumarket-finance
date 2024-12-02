import 'reflect-metadata';
import { IDL, StableBTreeMap, stableJson } from 'azle';
import {
  Canister,
  init,
  preUpgrade,
  postUpgrade,
  query,
  update,
  text,
  Vec,
  Void,
} from 'azle/experimental';
import { initDb } from './db';
import { Context } from './types';
import { ShipmentDetailsModel } from './entities/shipmentDetails.entity';
import { MilestoneDetails, ShipmentDetails } from './types/shipment';
import { auth } from './authorization';
import { ShipmentActivityModel } from './entities/shipmentActivity.entity';
import { Activity } from './types/activity';

const stableDbMap = StableBTreeMap<'DATABASE', Uint8Array>(0, stableJson, {
  toBytes: (data: Uint8Array) => data,
  fromBytes: (bytes: Uint8Array) => bytes,
});

const context: Context = {};

export default Canister({
  init: init([], async function (): Promise<void> {
    console.log('init');
    try {
      const { db, dataSource } = await initDb();
      context.db = db;
      context.dataSource = dataSource;
    } catch (error) {
      console.log(error);
    }
    console.log('init done');
  }),

  preUpgrade: preUpgrade(function (): void {
    console.log('pre upgrade');
    if (!context.db) {
      return;
    }
    stableDbMap.insert('DATABASE', context.db.export());
  }),

  postUpgrade: postUpgrade([], async function (): Promise<void> {
    console.log('post upgrade');
    const database = stableDbMap.get('DATABASE');
    if (database === null) {
      throw new Error('Failed to get database');
    }
    const { db, dataSource } = await initDb(database);
    context.db = db;
    context.dataSource = dataSource;
    console.log({ db, dataSource });
  }),

  getVersion: query([], text, function (): string {
    return '0.0.2';
  }),

  getShipmentsList: query([], Vec(ShipmentDetails), async function (): Promise<
    ShipmentDetails[]
  > {
    if (!context.dataSource) {
      throw new Error('Data source not initialized');
    }

    const shipments = await context.dataSource
      .getRepository(ShipmentDetailsModel)
      .find();

    const shipmentsSerialized = shipments.map(serializeShipment);

    return shipmentsSerialized || [];
  }),

  getShipmentDetails: query(
    [text],
    ShipmentDetails,
    async function (id: string): Promise<ShipmentDetails> {
      if (!context.dataSource) {
        throw new Error('Data source not initialized');
      }

      const shipment = await context.dataSource
        .getRepository(ShipmentDetailsModel)
        .findOneBy({ id });

      if (!shipment) {
        throw new Error('Shipment not found');
      }

      const shipmentSerialized = serializeShipment(shipment);

      return shipmentSerialized;
    }
  ),

  createShipment: update(
    [ShipmentDetails, text],
    Void,
    async function (
      shipment: ShipmentDetails,
      signature: string
    ): Promise<void> {
      await auth(signature);
      if (!context.dataSource) {
        throw new Error('Data source not initialized');
      }

      await context.dataSource.getRepository(ShipmentDetailsModel).insert({
        ...shipment,
        vaultAddress:
          shipment.vaultAddress && shipment.vaultAddress.Some
            ? shipment.vaultAddress.Some
            : '',
      });
    }
  ),

  updateMilestone: update(
    [text, MilestoneDetails, text],
    Void,
    async function (
      id: string,
      milestone: MilestoneDetails,
      signature: string
    ): Promise<void> {
      await auth(signature);
      if (!context.dataSource) {
        throw new Error('Data source not initialized');
      }

      const shipment = await context.dataSource
        .getRepository(ShipmentDetailsModel)
        .findOneBy({ id });

      if (!shipment) {
        throw new Error('Shipment not found');
      }

      const milestoneIndex = shipment.milestones.findIndex(
        (m) => m.id === milestone.id
      );

      if (milestoneIndex < 0) {
        throw new Error('Milestone not found');
      }

      if (milestoneIndex !== shipment.currentMilestone) {
        throw new Error('Milestone not in order');
      }

      shipment.milestones[milestoneIndex] = milestone;

      await context.dataSource.getRepository(ShipmentDetailsModel).update(
        { id },
        {
          currentMilestone: shipment.currentMilestone + 1,
          milestones: shipment.milestones,
        }
      );
    }
  ),
  getShipmentActivity: query(
    [text],
    Vec(Activity),
    async function (id: string): Promise<Activity[]> {
      if (!context.dataSource) {
        throw new Error('Data source not initialized');
      }
      const activity = await context.dataSource
        .getRepository(ShipmentActivityModel)
        .find({
          where: { shipmentId: id },
          order: { createdAt: 'DESC' },
        });

      return activity.map((a) => ({
        ...a,
        createdAt: a.createdAt.toDateString(),
      }));
    }
  ),
  createShipmentActivity: update(
    [text, Activity, text],
    Void,
    async function (
      id: string,
      activity: Partial<Activity>,
      signature: string
    ): Promise<void> {
      await auth(signature);
      if (!context.dataSource) {
        throw new Error('Data source not initialized');
      }

      await context.dataSource
        .getRepository(ShipmentActivityModel)
        .insert({ shipmentId: id, ...activity });
    }
  ),
});

function serializeShipment(shipment: ShipmentDetails): ShipmentDetails {
  return {
    ...shipment,
    shippingStartDate: shipment.shippingStartDate.toDateString(),
    expectedShippingEndDate: shipment.expectedShippingEndDate.toDateString(),
    vaultAddress: shipment.vaultAddress ? { Some: shipment.vaultAddress } : {},
  };
}
