import { DHT22 } from "../adapters/dht22";

export const socketHandler = (io: any) => {
  io.on("connection", (socket: any) => {
    const sensor = new DHT22();
    console.log("Cliente conectado al WebSocket");
    socket.emit(
      "dht22/data",
      sensor.read().then((data) => data)
    );
    setInterval(() => {
      socket.emit(
        "dht22/data",
        sensor.read().then((data) => data)
      );
    }, 1000);
    socket.on("disconnect", () => {
      console.log("Cliente desconectado del WebSocket");
    });
  });
};
