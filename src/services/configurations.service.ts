import { DataSource } from "typeorm";
import { ConfigurationDatabaseEntity } from "../entity/configurations.entity";

export class ConfigurationsService {
  private database: DataSource;
  private databaseSchema: typeof ConfigurationDatabaseEntity;
  constructor(
    databaseSchema: typeof ConfigurationDatabaseEntity,
    database: DataSource
  ) {
    this.database = database;
    this.databaseSchema = databaseSchema;
  }
  async save(data: Partial<ConfigurationDatabaseEntity>) {
    console.log("Guardando configuraciones en la base de datos", data);
    return this.database.getRepository(this.databaseSchema).save(data);
  }
  async get() {
    return this.database.getRepository(this.databaseSchema).find();
  }
}
