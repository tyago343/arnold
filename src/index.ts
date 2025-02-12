import express from "express";
import { Server } from "socket.io";
import http from "node:http";
import "reflect-metadata";
import database from "./db";
import { DataSource } from "typeorm";
import { dht22SocketHandler } from "./sockets/dht22.socket";
import cors from "cors";
import { ConfigurationsController } from "./controllers/configurations.controller";

class App {
  public app: express.Application;
  public port: number;
  public io: Server;
  public server: http.Server;
  private database: DataSource;

  constructor(controllers: any[], port: number, database: DataSource) {
    this.app = express();
    this.port = port || 3000;
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
      },
    });
    this.database = database;
    this.initializeMiddlewares();
    this.initializeSockets();
    this.initializeControllers(controllers);
  }

  private async initializeDatabase(database: DataSource) {
    await database.initialize();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeSockets() {
    dht22SocketHandler(this.io);
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      new controller(this.app);
    });
  }

  public listen() {
    this.initializeDatabase(this.database).then(() => {
      this.server.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
      });
    });
  }
}

const app = new App([ConfigurationsController], 3000, database);
app.listen();
