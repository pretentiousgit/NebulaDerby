const { createStore } = require('redux');

// import the reducer
const reducer = require('./reducer');

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(reducer);

module.exports = store;