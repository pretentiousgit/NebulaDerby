const express = require("express");
const app = express();
const server = require("http").createServer(app);
const ip = require("ip");
const opn = require("opn");
const npm = require("npm");
const fs = require("fs");

const rewriter = require("./server/rewriteGameIndex");

// turn on Primus and stick an ear into the internet
const sockets = require("./server/socketInputOutput")(server);
const store = require("./server/redux/store"); // boot store?

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(require("body-parser")());

// CONFIGURATION ====================================================
global.rootRequire = name =>
  require(`${__dirname}/$
{name}`);

app.use("/game", express.static(__dirname + "/hypeAnimation3"));

app.use("/", express.static(__dirname + "/build"));

// Use FS to write the local ip address into the game's index.html
// rewriter();

// Turn on server
server.listen(3001, () => {
  console.log("Server listening on port 3001");
  console.log("local ip address", ip.address());
  // opn(`http://${ip.address()}:3001/game`, {app: ['chromium-browser', '--kiosk']})
  // .catch((err) => {
  //   console.log(err);
  // });
});
