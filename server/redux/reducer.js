const _ = require('lodash');
const Action = require("./actions").actionTypes;
// reduce them to the new state
const initialState = require('../config.initialState');

function randn_bm() { // random box-mueller number around 0,1 - this is a good multiplier for another number
  var u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1] to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
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
  const { raceTimeTotal, interval, whales, targetWhale, finishLine, beacon, loveWhaleBoost } = state;
  let step = Math.round(finishLine / (raceTimeTotal / interval));
  // TODO This worked with 4 seconds over the valid distance but not 90! WORK IT OUT

  const newWhales = whales.map((whale) => {
    let newWhale = whale;

    // add beacon influence
    if (beacon.green && whale.name === 'cyber') {
      step = step * 1.65;
    }
    if (beacon.blue && whale.name === 'imperial') {
      step = step * 1.65;
    }
    if (beacon.red && whale.name === 'predator') {
      step = step * 1.65;
    }
    if (whale.name === 'love') {
      const boost = [1, 1.65, 2.25];
      step = boost[loveWhaleBoost - 1];
    }

    const randomBM = Math.abs(randn_bm());
    const beat = getRandomIntInclusive(step, 5 * step);
    newWhale.position = whale.position + (beat * randomBM);

    return newWhale;
  });
  let whaleOrder = _.orderBy(newWhales, 'position', 'desc');
  if (targetWhale) {
    whaleOrder = whaleOrder.filter((w) => w.name !== targetWhale);
  }

  return {
    ...state,
    raceTimeRemaining: action.raceTimeRemaining,
    whales: whaleOrder
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
  [Action.SET_LOVE_WHALE]: objectUpdate,
  [Action.BEACON]: objectUpdate,
  [Action.SET_FINISH_LINE]: objectUpdate,
  [Action.SET_TARGET_WHALE]: objectUpdate
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
