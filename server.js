const express = require("express");
const app = express();
const server = require('http').createServer(app);

// turn on Primus and stick an ear into the internet
const sockets = require('./server/socketInputOutput')(server);

app.use(require("body-parser")());

// CONFIGURATION ====================================================
global.rootRequire = name => require(`${__dirname}/$
{name}`);

app.use('/game', express.static(__dirname + '/hypeAnimation'));

app.use('/', express.static(__dirname + '/build'));

// Turn on server
server.listen(3001, () => {
  console.log("Server listening on port 3001");
});