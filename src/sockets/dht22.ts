let sensorData = { temperature: 22.5, humidity: 60 };

setInterval(() => {
  sensorData = {
    temperature: +(Math.random() * 5 + 20).toFixed(1),
    humidity: +(Math.random() * 10 + 50).toFixed(1),
  };
}, 2000);

export const socketHandler = (io: any) => {
  io.on("connection", (socket: any) => {
    console.log("Cliente conectado al WebSocket");

    socket.emit("dht22/data", sensorData);

    setInterval(() => {
      socket.emit("dht22/data", sensorData);
    }, 2000);

    socket.on("disconnect", () => {
      console.log("Cliente desconectado del WebSocket");
    });
  });
};
