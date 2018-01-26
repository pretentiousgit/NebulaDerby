const store = require('./store');
const Race = require('../game/engine');

// Action Types
const START_RACE = "START_RACE";
const STOP_RACE = "STOP_RACE";
const RESET_RACE = "RESET_RACE";
const REORDER_RACE_POSITIONS = "REORDER_RACE_POSITIONS";
const UPDATE_RACE_POSITIONS = "UPDATE_RACE_POSITIONS";
const TRANZONIC = 'TRANZONIC';
const GALACTAGASM = 'GALACTAGASM';
const FLEET_ATTACK = 'FLEET_ATTACK';

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
  return dispatch => {
    dispatch({
      type: STOP_RACE,
      running: false,
      race: null
    });
  };
}

function updateRacePositions(timeRemaining) {
  console.log('UPDATE_RACE_POSITIONS');
  return dispatch => {
    dispatch({
      type: UPDATE_RACE_POSITIONS,
      raceTimeRemaining: timeRemaining
    });
  };
}

function reorderRacePositions(timeRemaining) {
  console.log('REORDER_RACE_POSITIONS');
  return dispatch => {
    dispatch({
      type: UPDATE_RACE_POSITIONS,
      raceTimeRemaining: timeRemaining
    });
  };
}

function tranzonic() {
  console.log('TRANZONIC');
  return dispatch => {
    dispatch({
      type: TRANZONIC
    });
  };
}

function fleetAttack() {
  console.log('GALACTAGASM');
  return dispatch => {
    dispatch({
      type: GALACTAGASM
    });
  };
}

function galactagasm() {
  console.log('FLEET_ATTACK');
  return dispatch => {
    dispatch({
      type: FLEET_ATTACK
    });
  };
}

module.exports = Object.freeze({
  START_RACE: START_RACE,
  STOP_RACE: STOP_RACE,
  RESET_RACE: RESET_RACE,
  REORDER_RACE_POSITIONS: REORDER_RACE_POSITIONS,
  UPDATE_RACE_POSITIONS: UPDATE_RACE_POSITIONS,
  TRANZONIC: TRANZONIC,
  GALACTAGASM: GALACTAGASM,
  FLEET_ATTACK: FLEET_ATTACK,
  resetRace,
  startRace,
  stopRace,
  updateRacePositions,
  reorderRacePositions,
  tranzonic,
  fleetAttack,
  galactagasm
});
