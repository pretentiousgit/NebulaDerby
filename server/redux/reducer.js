// import possible actions
const {
  START_RACE,
  STOP_RACE,
  RESET_RACE,
  REORDER_RACE_POSITIONS,
  UPDATE_RACE_POSITIONS,
  TRANZONIC,
  GALACTAGASM,
  FLEET_ATTACK
} = require("./actions");

// reduce them to the new state
const initialState = require('../config.initialState');

module.exports = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_RACE:
      return {
        state: { ...initialState }
      };
    case START_RACE:
      return {
        ...state,
        running: action.running
      };
    case STOP_RACE:
      return {
        ...state,
        running: action.running
      };
    case REORDER_RACE_POSITIONS:
      return {
        ...state,
        race_positions: action.racePositions
      };
    case UPDATE_RACE_POSITIONS:
      return {
        ...state,
        racePositions: action.racePositions,
        raceTimeRemaining: action.raceTimeRemaining
      };
    case TRANZONIC:
      return {
        ...state
      };
    case GALACTAGASM:
      return {
        ...state
      };
    case FLEET_ATTACK:
      return {
        ...state,
        running: action.running
      };
    default:
      return {
        ...state
      };
  }
};
