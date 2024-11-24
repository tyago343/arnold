import express from "express";
import { DHT22 } from "./adapters/dht22";

const app = express();
app.listen(3000, () => {
  const adaptador = new DHT22();

  console.log("Server is running on port 4000");
  app.get("/", async (_req, res) => {
    try {
      console.log("Reading data...");
      const data = await adaptador.read();
      console.log("Data readed");
      res.json(data);
    } catch (error) {}
  });
});
