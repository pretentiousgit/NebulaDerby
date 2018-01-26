const Primus = require('primus');
const store = require('./redux/store');
const actions = require('./redux/actions');

const options = {
  port: 3001,
  pathname: '/api',
  pingInterval: false,
  transformer: 'engine.io'
};

const adminEventHandlers = {
  newHeat() {
    actions.resetRace();
  },
  startRace() {
    actions.startRace();
  },
  stopRace() {
    actions.stopRace();
  }
};

const defaultHandler = (data) => console.log(data.event);

module.exports = async (server) => {
  try {
    const primus = new Primus(server, options);
    console.log('Primus booting on port ', options.port);

    primus.on('connection', (spark) => {
      console.log('Primus connected to a client', spark.id);
      spark.write('hello connection', spark.id);

      // Handle data coming in from administrator
      spark.on('data', (data) => {
        // we never receive data from the game, only the admin panel.
        console.log('server received data', data);
        if( !data.adminEvent ) {
          console.log('non-admin event', data);
          return;
        }

        const handler = adminEventHandlers[data.adminEvent.event] || defaultHandler;
        handler(data);
      });

      // Subscribe to the store and output to any display clients
      store.subscribe(() => {
        const { raceTimeRemaining, whales } = store.getState();
        console.log('when store changes... raceTimeRemaining:', raceTimeRemaining);
        // spark.write({ timer: raceTimeRemaining, whales });
      });
    });


    primus.on('disconnection', (spark) => {
      // the spark that disconnected
      spark.write('goodbye connnection', spark.id);
    });
  } catch (err) {
    throw new Error('Something went wrong', err.message, err.stack);
  }
};

