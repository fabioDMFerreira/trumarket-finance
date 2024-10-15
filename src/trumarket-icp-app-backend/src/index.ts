import 'reflect-metadata';
import { StableBTreeMap, stableJson } from 'azle';
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
import { ShippingDetails } from './interfaces/shipment';
import { ShipmentDetails } from './entities/shipmentDetails.entity';

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

  getShipmentsList: query([], Vec(ShippingDetails), async function (): Promise<
    ShippingDetails[]
  > {
    if (!context.dataSource) {
      throw new Error('Data source not initialized');
    }

    const shipments = await context.dataSource
      .getRepository(ShipmentDetails)
      .find();

    const shipmentsSerialized = shipments.map(serializeShipment);

    return shipmentsSerialized || [];
  }),

  getShipmentDetails: query(
    [text],
    ShippingDetails,
    async function (id: string): Promise<ShippingDetails> {
      if (!context.dataSource) {
        throw new Error('Data source not initialized');
      }

      const shipment = await context.dataSource
        .getRepository(ShipmentDetails)
        .findOneBy({ id });

      if (!shipment) {
        throw new Error('Shipment not found');
      }

      return serializeShipment(shipment);
    }
  ),

  createShipment: update(
    [ShippingDetails],
    Void,
    async function (shipment: ShippingDetails): Promise<void> {
      if (!context.dataSource) {
        throw new Error('Data source not initialized');
      }

      await context.dataSource.getRepository(ShipmentDetails).insert(shipment);
    }
  ),
});

function serializeShipment(shipment: ShipmentDetails): ShippingDetails {
  return {
    ...shipment,
    shippingStartDate: shipment.shippingStartDate.toDateString(),
    expectedShippingEndDate: shipment.expectedShippingEndDate.toDateString(),
  };
}
