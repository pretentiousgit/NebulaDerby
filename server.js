const express = require("express");
const app = express();

const OSC = require("osc-js");

const config = { udpClient: { port: 9129 } };
const osc = new OSC({ plugin: new OSC.BridgePlugin(config) });

osc.open(); // start a WebSocket server on port 8080

app.use(require("body-parser")());

// CONFIGURATION ====================================================
global.rootRequire = name => require(`${__dirname}/${name}`);

// app.use(express.static(`${__dirname}/public`));

app.get("/pilots", function(req, res) {
  res.json(require("./server/pilots"));
});

app.listen(3001, function() {
  console.log("Server listening on port 3001");
});
