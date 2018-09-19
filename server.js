const express = require("express");
const app = express();
const server = require('http').createServer(app);
const ip = require('ip');
const opn = require('opn');
const npm = require('npm');

// turn on Primus and stick an ear into the internet
const sockets = require('./server/socketInputOutput')(server);
const store = require('./server/redux/store'); // boot store?

app.use(require("body-parser")());

// CONFIGURATION ====================================================
global.rootRequire = name => require(`${__dirname}/$
{name}`);

app.use('/game', express.static(__dirname + '/hypeAnimation'));

app.use('/', express.static(__dirname + '/build'));

// Turn on server
server.listen(3001, () => {
  console.log("Server listening on port 3001");
  console.log ('local ip address', ip.address() );
  npm.load({}, function (er) {
    if (er) { return; }
    npm.commands.run(['fullscreen']);
  });
  // Specify app arguments
  opn(`http://${ip.address()}:3001/game`, {app: ['midori', 'Fullscreen']});
});