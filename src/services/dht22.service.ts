import { DataSource } from "typeorm";
import { DHT22, DHT22Entity } from "../adapters/dht22";
import { Server } from "socket.io";
import { DHT22DatabaseEntity } from "../entity/dht22.entity";

export class DHT22Service {
  private sensor: DHT22;
  private io: Server | null;
  private database: DataSource;
  private databaseSchema: typeof DHT22DatabaseEntity;
  constructor(
    io: Server | null,
    databaseSchema: typeof DHT22DatabaseEntity,
    database: DataSource
  ) {
    this.sensor = new DHT22();
    this.io = io;
    this.database = database;
    this.databaseSchema = databaseSchema;
  }
  public readAndEmit() {
    this.io?.emit(
      "dht22/data",
      this.sensor.read().then((data) => data)
    );
  }
  public realTimeSensor(seconds: number = 1) {
    setInterval(() => {
      this.readAndEmit();
    }, seconds * 1000);
  }
  public async save(data: DHT22Entity) {
    console.log("Guardando datos en la base de datos", data);
    this.database.getRepository(this.databaseSchema).save(data);
  }
}
