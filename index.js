import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

dotenv.config();

const port = process.env.SOCKET_PORT || 4000;
const ioServer = createServer();

const io = new Server(ioServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  //   console.log("A user connected");

  socket.on("sendMessage", (message) => {
    const { name, message: msg } = message;
    io.emit("receiveMessage", { name, message: msg });
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected");
  });
});

ioServer.listen(port, () => {
  console.log(`Socket.io server running on port ${port} ....`);
});
