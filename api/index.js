const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.get("/", (req, r) => r.send("ok"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000 ",
    // allowedHeaders: ["Access-Control-Allow-Origin"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("public_channel", (message) => {
    console.log("heheh", message);
    io.emit("public_channel", message);
  });

  // io.emit("public", { mmessage: "ok" });
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
