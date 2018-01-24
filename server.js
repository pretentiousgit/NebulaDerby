const express = require("express");
const app = express();
const server = require('http').createServer(app);
const path = require('path');

const _ = require("lodash");
const sortBy = require('lodash/sortBy');
const reverse = require('lodash/reverse');

const sockets = require('./server/sockets')(server);

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