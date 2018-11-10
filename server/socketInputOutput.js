const store = require('./redux/store');
const actions = require('./redux/boundActions');
const Race = require('./game/engine');
const watch = require('redux-watch');

const adminEventHandlers = {
  tranzonicInterference: actions.tranzonic,
  fleetAttack: actions.fleetAttack,
  galactagasm: actions.galactagasm
};

const defaultHandler = (data) => console.log(data.event);

module.exports = async (server) => {
  try {
    const io = require('socket.io')(server,
      {
        serveClient: true,
        // below are engine.IO options
        pingInterval: 1000,
        pingTimeout: 10000,
        upgradeTimeout: 30000,
        cookie: false
      }
    );
    console.log('socket.io booting');

    io.on('connection', (client) => {
      console.log('Socket connected to a client', client.id);

      const def = {
        blue: false,
        red: false,
        green: false
      };
      client.emit('setBeacon', def);
      client.broadcast.emit('setBeacon', def);

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
        console.log('Game screen connected', d);
        actions.setFinishLine(d.finishLine - d.whaleWidth);
      });

      client.on('predator', (d) => {
        console.log('Game screen connected', d);
        actions.setTargetWhale(d.target);
        client.broadcast.emit('predator', { target: d.target });
        // Todo:
        // Filter target whales so that they can't win if dead
      });

      // Handle DM event
      client.on('startRace', (d) => {
        console.log('Received start race request');
        const { running, raceTimeRemaining, raceTimeTotal } = store.getState();

        console.log('timeRemaining', raceTimeRemaining);
        if (!running) {
          console.log('calling race');
          // Deal with a whale position reset
          client.broadcast.emit('startRace', { timer: raceTimeTotal });
          actions.newHeat();
          Race();
        } else {
          console.log('Race is running');
          // adminEventHandlers.resetRace();
        }
      });

      client.on('resetRace', (d) => {
        console.log('Reset Race');
        client.broadcast.emit('newHeat');
      });

      client.on('beacon', (d) => {
        //Todo: emit a state-set for the beacon
        console.log('beacon', d);
        const def = {
          blue: false,
          red: false,
          green: false
        };

        def[d.color] = !d.set;
        actions.setBeacon(def);
        client.emit('setBeacon', def);
        client.broadcast.emit('setBeacon', def);
      });

      client.on('fakeHeat', (d) => {
        //Todo: emit a state-set for the beacon
        console.log(d);
        const def = {
          fakeHeat: false
        };

        def.fakeHeat = !d.set;
        client.emit('setFakeHeat', def);
      });

      // Handle DM event
      client.on('adminEvent', (d) => {
        console.log('Admin event', d.event);
        const handler = adminEventHandlers[d.event] || defaultHandler;
        handler();
        client.broadcast.emit(d.event);
        client.broadcast.emit('adminEvent', { hello: 'world' });
      });

      client.on('disconnect', (client) => {
        // the client that disconnected
        console.log('Client disconnect ', client.id);
      });

      let race = watch(store.getState, 'whales');
      store.subscribe(race((newVal, oldVal, objectPath) => {
        client.broadcast.emit('whaleState', { whales: newVal });

        // Deal with winning
        const finishLine = store.getState().finishLine;
        const winner = newVal.filter((w) => {
          return w.position > finishLine;
        });

        if (winner.length > 0) {
          client.broadcast.emit('winner', { faction: winner[0].faction });
        }
      }));

      let cancel = watch(store.getState, 'running');
      store.subscribe(cancel((newVal, oldVal, objectPath) => {
        if (newVal === false && oldVal === true) {
          client.broadcast.emit('raceEnd');
        }
      }));
    });

  } catch (err) {
    throw new Error('Something went wrong', err.message, err.stack);
  }
};
