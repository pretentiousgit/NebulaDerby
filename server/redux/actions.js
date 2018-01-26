const store = require('./store');
const Race = require('../game/engine');

// Action Types
const START_RACE = "START_RACE";
const STOP_RACE = "STOP_RACE";
const RESET_RACE = "RESET_RACE";
const RE_ORDER_RACE_POSITIONS = "RE_ORDER_RACE_POSITIONS";
const UPDATE_RACE_POSITIONS = "UPDATE_RACE_POSITIONS";

// Actions
function resetRace() {
  console.log('RESET_RACE');
  return dispatch => {
    dispatch({
      type: RESET_RACE
    });
  };
}

function startRace() {
  console.log('START_RACE');
  const race = Race();
  return dispatch => {
    dispatch({
      type: START_RACE,
      race: race
    });
  };
}

function stopRace() {
  console.log('STOP_RACE');
  const state = store.getState();
  clearInterval(state.race);
  return dispatch => {
    dispatch({
      type: STOP_RACE,
      running: false,
      race: null
    });
  };
}

function updateRacePositions() {
  return dispatch => {
    const state = store.getState();

    dispatch({
      type: UPDATE_RACE_POSITIONS,
      raceTimeRemaining: state.raceTimeRemaining -= state.interval
    });
  };
}

module.exports = Object.freeze({
  START_RACE: START_RACE,
  STOP_RACE: STOP_RACE,
  RESET_RACE: RESET_RACE,
  RE_ORDER_RACE_POSITIONS: RE_ORDER_RACE_POSITIONS,
  UPDATE_RACE_POSITIONS: UPDATE_RACE_POSITIONS,
  resetRace,
  startRace,
  stopRace,
  updateRacePositions
});
