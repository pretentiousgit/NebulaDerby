const Action = require("./actions").actionTypes;
// reduce them to the new state
const initialState = require('../config.initialState');

function randn_bm() { // random box-mueller number around 0,1 - this is a good multiplier for another number
  var u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1] to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function returnState(state, action) {
  // console.log('state return');
  return { ...state };
}

function objectUpdate(state, newItems) {
  // console.log('object update');
  const update = {
    ...state,
    ...newItems
  };
  return update;
}

function newHeat(state, action) {
  const whales = initialState.whales.map((m) => {
    m.position = 60;
    return m;
  });
  return {
    ...state,
    running: action.running,
    raceTimeRemaining: initialState.raceTimeTotal,
    whales: whales,
    winner: null
  };
}

function updateRacePositions(state, action) {
  const { raceTimeTotal, interval, whales } = state;
  const step = raceTimeTotal / interval;

  const newWhales = whales.map((whale) => {
    let newWhale = whale;

    const randomBM = Math.abs(randn_bm());
    newWhale.position = whale.position + (step * randomBM);

    return newWhale;
  });
  return {
    ...state,
    raceTimeRemaining: action.raceTimeRemaining,
    whales: newWhales
  };
}

const options = {
  [Action.START_RACE]: objectUpdate,
  [Action.STOP_RACE]: objectUpdate,
  [Action.NEW_HEAT]: newHeat,
  [Action.UPDATE_RACE_POSITIONS]: updateRacePositions,
  [Action.TRANZONIC]: returnState,
  [Action.GALACTAGASM]: returnState,
  [Action.FLEET_ATTACK]: objectUpdate,
  [Action.WINNER]: objectUpdate,
  [Action.SET_FINISH_LINE]: objectUpdate
};

module.exports = (state = initialState, action = {}) => {
  console.log('server action', action);
  let cleanState = state;
  // if (state.error && action.type !== Action.CATCH_ERROR) {
  //   cleanState = { ...state, error: { messages: [] } };
  // }
  const func = options[action.type] || returnState;
  return func(cleanState, action);
};
