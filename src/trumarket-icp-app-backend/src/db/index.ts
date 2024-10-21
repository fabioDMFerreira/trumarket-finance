import initSqlJs, { Database } from 'sql.js/dist/sql-asm';
import { DataSource } from 'typeorm';
import { Context } from '../types';
import { ShipmentDetailsModel } from '../entities/shipmentDetails.entity';
import { ShipmentActivityModel } from '../entities/shipmentActivity.entity';

// TODO figure out migrations
export async function initDb(
  bytes: Uint8Array = Uint8Array.from([])
): Promise<Context> {
  const AppDataSource = new DataSource({
    type: 'sqljs',
    synchronize: true, // TODO we should figure out real migrations for people
    entities: [ShipmentDetailsModel, ShipmentActivityModel],
    migrations: [],
    driver: await initSqlJs({}),
    database: bytes,
  });

  const _appDataSource = await AppDataSource.initialize();

  return {
    db: _appDataSource.driver as unknown as Database,
    dataSource: _appDataSource,
  };
}
