import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { DHT22DatabaseEntity } from "../entity/dht22.entity";
dotenv.config();
const database = new DataSource({
  type: "postgres",
  host: process.env["DB_HOST"],
  port: parseInt(process.env["DB_PORT"] || "5432"),
  username: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
  synchronize: process.env["DB_SYNC"] === "true",
  logging: true,
  entities: [DHT22DatabaseEntity],
  subscribers: [],
  migrations: [],
});
export default database;
