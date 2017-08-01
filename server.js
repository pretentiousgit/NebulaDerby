const express = require("express");
const app = express();
const OSC = require("osc-js");

const config = { udpClient: { port: 9129 } };
const osc = new OSC({ plugin: new OSC.BridgePlugin(config) });

osc.open(); // start a WebSocket server listening on port 8080

app.use(require("body-parser")());

// CONFIGURATION ====================================================
global.rootRequire = name => require(`${__dirname}/${name}`);

app.get("/pilots", function(req, res) {
  res.json(require("./server/pilots"));
});

// Turn on server
const server = app.listen(3001, function() {
  console.log("Server listening on port 3001");
});

// Turn on socket.io rooms for message transport
const io = require("socket.io")(server);

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("enterRoom", function(data) {
    console.log("A user joined", data.user);
    socket.join("whaleSpace");
  });

  socket.on("adminEvent", function(data) {
    console.log("An Event!", data.event);
    socket.broadcast.emit(data.event);
  });
});
