import { getConnectionManager } from "typeorm";
import config from "../config";
import { getEntityPath, getMigrationPath } from "../utils/pathUtils";

const connectionManager = getConnectionManager();
const db = connectionManager.create({
  type: config[process.env.NODE_ENV].dialect,
  host: config[process.env.NODE_ENV].host,
  port: config[process.env.NODE_ENV].port,
  username: config[process.env.NODE_ENV].username,
  password: config[process.env.NODE_ENV].password,
  database: config[process.env.NODE_ENV].database,
  entities: [`${getEntityPath()}/*.{ts,js}`],
  migrationsTableName: "migration",
  migrations: [`${getMigrationPath()}/*.ts`],
  cli: {
    migrationsDir: getMigrationPath(),
  },
  logging: true,
});

export default db;
