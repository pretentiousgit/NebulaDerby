const Primus = require('primus');
const _ = require('lodash');

const initialState = require('./initialState');

const options = {
  port: 3001,
  pathname: '/api',
  pingInterval: false,
  transformer: 'engine.io'
};

module.exports = async (server) => {
  try {
    const primus = new Primus(server, options);
    console.log('Primus booting on port ', options.port);

    primus.on('connection', (spark) => {
      console.log('Primus connected to a client', spark.id);
      spark.write('hello connection', spark.id);

      spark.on('data', (data) => {
        console.log('server received data', data);

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

