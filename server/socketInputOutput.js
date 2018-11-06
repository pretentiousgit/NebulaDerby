const store = require('./redux/store');
const actions = require('./redux/boundActions');
const Race = require('./game/engine');
const gameFunctions = require('./game/gameFunctions');
const watch = require('redux-watch');

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
        const { running, raceTimeRemaining } = store.getState();

        console.log('timeRemaining', raceTimeRemaining);
        if (raceTimeRemaining < 0) {
          actions.newHeat();
          Race();
        } else if (!running) {
          console.log('calling race');
          Race();
        } else {
          console.log('Race is running');
          // adminEventHandlers.resetRace();
        }
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
      let race = watch(store.getState, 'whales');
      store.subscribe(race((newVal, oldVal, objectPath) => {
        console.log('check new and old val', newVal, oldVal);
        client.emit('whaleState', { whales: newVal });
      }));

      let cancel = watch(store.getState, 'running');
      store.subscribe(cancel((newVal, oldVal, objectPath) => {
        if (newVal === false && oldVal === true) {
          client.emit('raceEnd');
        }
      }));
    });

  } catch (err) {
    throw new Error('Something went wrong', err.message, err.stack);
  }
};
