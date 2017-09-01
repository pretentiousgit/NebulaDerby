const express = require("express");
const app = express();
const osc = require("osc-js");
const path = require('path');

app.use(require("body-parser")());

// CONFIGURATION ====================================================
global.rootRequire = name => require(`${__dirname}/${name}`);

app.use('/game', express.static(__dirname + '/hypeAnimation'))

// Turn on server
const server = app.listen(3001, function () {
  console.log("Server listening on port 3001");
});

// Turn on socket.io rooms for message transport
const io = require("socket.io")(server);

const clientList = [];

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", (msg) => {
    console.log("message!", msg);
    io.emit('messageToClient', 'hello world!');
  });

  socket.on("enterRoom", (data) => {
    // This is where we hook the Muse headset into the server
    console.log("A user joined", data.user);
    clientList.concat({ name: data.user, id: socket.id });
    socket.join("whaleSpace");
    io.emit("currentUserList", clientList);
  });

  socket.on("adminEvent", function (data) {
    console.log("An Event!", data.event);
    socket.broadcast.emit(data.event);

    /* Possible Events List
     * Galactagasm
     * TranzonicInterference
     * FleetAttack
     * startRace
    */
  });

  socket.on("startRace", function (data) {
    console.log("Start the race!", data.event);
    socket.broadcast.emit(data.event);
  });

  // var oscSocketPort = new osc.WebSocketPort({
  //   socket: socket,
  //   metadata: true
  // });

  // oscSocketPort.on("message", function(oscMsg) {
  //   console.log("An OSC Message was received!", oscMsg);
  // });
});
