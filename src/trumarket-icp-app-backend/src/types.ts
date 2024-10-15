import { Database } from 'sql.js/dist/sql-asm';
import { DataSource } from 'typeorm';

export type Context = {
  db?: Database;
  dataSource?: DataSource;
};
