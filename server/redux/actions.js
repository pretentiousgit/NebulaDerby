// Action Types
const START_RACE = "START_RACE";
const STOP_RACE = "STOP_RACE";
const NEW_HEAT = "NEW_HEAT";
const UPDATE_RACE_POSITIONS = "UPDATE_RACE_POSITIONS";
const TRANZONIC = 'TRANZONIC';
const GALACTAGASM = 'GALACTAGASM';
const FLEET_ATTACK = 'FLEET_ATTACK';
const SET_FINISH_LINE = 'SET_FINISH_LINE';
const SET_TARGET_WHALE = 'SET_TARGET_WHALE';
const WINNER = 'WINNER';

// Actions
function startRace() {
  console.log('START_RACE');
  return {
    type: START_RACE,
    running: true
  };
}

function newHeat() {
  console.log('NEW_HEAT');
  return {
    type: NEW_HEAT,
    running: false
  };
}

function stopRace(message) {
  console.log('STOP_RACE', message);
  return {
    type: STOP_RACE,
    running: false
  };
}

function updateRacePositions(timeRemaining) {
  console.log('UPDATE_RACE_POSITIONS', timeRemaining);
  return {
    type: UPDATE_RACE_POSITIONS,
    raceTimeRemaining: timeRemaining
  };
}

function tranzonic() {
  console.log('TRANZONIC');
  return {
    type: TRANZONIC
  };
}

function fleetAttack() {
  console.log('FLEET_ATTACK');
  return {
    type: FLEET_ATTACK,
    running: false
  };
}

function galactagasm() {
  console.log('GALACTAGASM');
  return {
    type: GALACTAGASM
  };
}

function setFinishLine(f) {
  console.log('FINISH_LINE', f);
  return {
    type: SET_FINISH_LINE,
    finishLine: f
  };
}

function setTargetWhale(f) {
  console.log('TARGET_WHALE', f);
  return {
    type: SET_TARGET_WHALE,
    targetWhale: f
  };
}

function setWinner(winner) {
  console.log('WINNER', winner);
  return {
    type: WINNER,
    winner
  };
}

module.exports = Object.freeze({
  actionTypes: {
    START_RACE: START_RACE,
    STOP_RACE: STOP_RACE,
    NEW_HEAT: NEW_HEAT,
    UPDATE_RACE_POSITIONS: UPDATE_RACE_POSITIONS,
    TRANZONIC: TRANZONIC,
    GALACTAGASM: GALACTAGASM,
    FLEET_ATTACK: FLEET_ATTACK,
    SET_FINISH_LINE: SET_FINISH_LINE,
    SET_TARGET_WHALE: SET_TARGET_WHALE
  },
  actions: {
    newHeat,
    startRace,
    stopRace,
    setFinishLine,
    updateRacePositions,
    setTargetWhale,
    setWinner,
    tranzonic,
    fleetAttack,
    galactagasm
  }
});
