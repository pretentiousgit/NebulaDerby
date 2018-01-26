const Primus = require('primus');
const _ = require('lodash');

const store = require('./redux/store');
const actions = require('./redux/actions');

const options = {
  port: 3001,
  pathname: '/api',
  pingInterval: false,
  transformer: 'engine.io'
};


function adminEvent(data) {
  switch (data.event) {
    case 'newHeat':
      actions.resetRace();
      break;
    case 'startRace':
      actions.startRace();
      break;
    case 'stopRace':
      actions.stopRace();
      break;
    default:
      console.log(data.event);
      break;
  }
}

module.exports = async (server) => {
  try {
    const primus = new Primus(server, options);
    console.log('Primus booting on port ', options.port);

    primus.on('connection', (spark) => {
      console.log('Primus connected to a client', spark.id);
      spark.write('hello connection', spark.id);

      spark.on('data', (data) => {
        // we never receive data from the game, only the admin panel.
        console.log('server received data', data);
        if( !data.event) {
          console.log('non-admin event', data);
          return;
        }

        adminEvent(data);
        // store.subscribe() {
        //   // on change do a thing
        // }
        // store.getState(); // this checks the state and tells me what's what.
      });
    });


    primus.on('disconnection', (spark) => {
      // the spark that disconnected
      spark.write('goodbye connnection');
    });
  } catch (err) {
    throw new Error('Something went wrong', err.message, err.stack);
  }
};

