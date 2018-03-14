const { createStore, applyMiddleware } = require('redux');
// const thunk = require('redux-thunk').default;

// import the reducer
const reducer = require('./reducer');

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(
  reducer
);

module.exports = store;
