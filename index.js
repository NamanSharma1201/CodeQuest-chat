import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

dotenv.config();

const port = process.env.SOCKET_PORT || 4000;
const ioServer = createServer();

const allowedOrigins = ["http://127.0.0.1:5173", "http://localhost:5173"];

const io = new Server(ioServer, {
  cors: {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
