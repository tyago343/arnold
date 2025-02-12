import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { DHT22, DHT22Entity } from "../adapters/dht22";
import { Server } from "socket.io";
import { DHT22DatabaseEntity } from "../entity/dht22.entity";
import { DHT22Mock } from "../adapters/dht22.mock";
dotenv.config();
const useMockedSensor = process.env["USE_MOCK_SENSORS"] === "true";
export class DHT22Service {
  private sensor: DHT22;
  private socket: Server | null;
  private database: DataSource;
  private databaseSchema: typeof DHT22DatabaseEntity;
  constructor(
    socket: Server | null,
    databaseSchema: typeof DHT22DatabaseEntity,
    database: DataSource
  ) {
    this.sensor = useMockedSensor ? new DHT22Mock() : new DHT22();
    this.socket = socket;
    this.database = database;
    this.databaseSchema = databaseSchema;
  }

  public readAndEmit() {
    this.sensor
      .read()
      .then((data) => {
        this.socket?.emit("dht22/data", data);
      })
      .catch((error) => {
        console.error("Failed to read sensor data:", error);
        setTimeout(() => this.readAndEmit(), 1000);
      });
  }
  public realTimeSensor(seconds: number = 1) {
    return setInterval(() => {
      this.readAndEmit();
    }, seconds * 1000);
  }
  public async save(data: DHT22Entity) {
    console.log("Guardando datos en la base de datos", data);
    this.database.getRepository(this.databaseSchema).save(data);
  }
}
