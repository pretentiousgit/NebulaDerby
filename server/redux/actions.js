// Action Types
const START_RACE = "START_RACE";
const STOP_RACE = "STOP_RACE";
const NEW_HEAT = "NEW_HEAT";
const UPDATE_RACE_POSITIONS = "UPDATE_RACE_POSITIONS";
const TRANZONIC = 'TRANZONIC';
const GALACTAGASM = 'GALACTAGASM';
const FLEET_ATTACK = 'FLEET_ATTACK';

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

module.exports = Object.freeze({
  actionTypes: {
    START_RACE: START_RACE,
    STOP_RACE: STOP_RACE,
    NEW_HEAT: NEW_HEAT,
    UPDATE_RACE_POSITIONS: UPDATE_RACE_POSITIONS,
    TRANZONIC: TRANZONIC,
    GALACTAGASM: GALACTAGASM,
    FLEET_ATTACK: FLEET_ATTACK
  },
  actions: {
    newHeat,
    startRace,
    stopRace,
    updateRacePositions,
    tranzonic,
    fleetAttack,
    galactagasm
  }
});
