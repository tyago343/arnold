import cron from "node-cron";
import { DHT22Service } from "../services/dht22.service";
import { DHT22DatabaseEntity } from "../entity/dht22.entity";
import database from "../db";
import { Server, Socket } from "socket.io";
import { DHT22 } from "../adapters/dht22";
export const dht22SocketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    const service = new DHT22Service(io, DHT22DatabaseEntity, database);
    console.log("Conexión al DHT22");
    service.readAndEmit();
    const interval = service.realTimeSensor();
    socket.on("disconnect", () => {
      clearInterval(interval);
      console.log("Desconexión al DHT22");
    });
  });
};
cron.schedule("0 * * * *", async () => {
  console.log("Ejecutando cron");
  const data = await new DHT22().read();
  const service = new DHT22Service(null, DHT22DatabaseEntity, database);
  service.save(data);
});
