import express from "express";
import { Server } from "socket.io";
import http from "node:http";
import { socketHandler } from "./sockets/dht22";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
socketHandler(io);
server.listen(3000, () => {
  console.log("Server is running on port 4600");
});
