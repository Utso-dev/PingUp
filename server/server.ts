import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const port = 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("join_room", (room) => {
    console.log("Message: " + room);
    socket.join(room);
  });
  socket.on("send_message", (data) => {
    console.log("send_message: " + data);
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("typing", ({ username, room }) => {
    console.log("typing: " + username + " in room: " + room);
    socket.to(room).emit("typing", { username, room });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
