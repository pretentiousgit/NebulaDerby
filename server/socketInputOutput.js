const store = require('./redux/store');
const actions = require('./redux/boundActions');
const Race = require('./game/engine');
const gameFunctions = require('./game/gameFunctions');

const adminEventHandlers = {
  newHeat: actions.resetRace,
  tranzonicInterference: actions.tranzonic,
  fleetAttack: actions.fleetAttack,
  galactagasm: actions.galactagasm
};

const defaultHandler = (data) => console.log(data.event);

module.exports = async (server) => {
  try {
    const io = require('socket.io')(server);
    console.log('socket.io booting');

    io.on('connection', (client) => {
      console.log('Socket connected to a client', client.id);
      client.emit('hello', { id: client.id });

      //TODO: PUT BACK gameFunctions.generateFairMovementArray();
      client.on('handshake', (d) => {
        console.log('Handshake ', d);
      });

      client.on('message', (d) => {
        console.log('message ', d);
      });

      client.on('event', (d) => {
        console.log('Event ', d);
      });

      client.on('adminShake', (d) => {
        console.log('Admin panel connected');
      });

      client.on('gameShake', (d) => {
        console.log('Game screen connected');
      });

      // Handle DM event
      client.on('startRace', (d) => {
        console.log('Received start race request');
        Race();
      });

      client.on('beacon', (d) => {
        //Todo: emit a state-set for the beacon
        console.log(d);
        const def = {
          blue: false,
          red: false,
          green: false
        };

        def[d.color] = !d.set;
        client.emit('setBeacon', def);
      });

      // Handle DM event
      client.on('adminEvent', (d) => {
        console.log('Admin event', d);
        const handler = adminEventHandlers[d.event] || defaultHandler;
        handler();
      });

      client.on('disconnect', (client) => {
        // the client that disconnected
        console.log('Client disconnect ', client.id);
      });

      // Subscribe to the store and output to any display clients
      store.subscribe(() => {
        const { raceTimeRemaining, whales } = store.getState();
        client.emit('whaleState', { timer: raceTimeRemaining, whales });
        if (raceTimeRemaining <= 0) {
          client.emit('raceEnd');
        }
      });
    });

  } catch (err) {
    throw new Error('Something went wrong', err.message, err.stack);
  }
};

