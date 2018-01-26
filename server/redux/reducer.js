// import possible actions
const {
  START_RACE,
  STOP_RACE,
  RESET_RACE,
  UPDATE_RACE_POSITIONS,
  REORDER_RACE_POSITIONS
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
        race: action.race,
        running: true
      };
    case STOP_RACE:
      return {
        ...state,
        race: action.race,
        running: false
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
    default:
      return {
        ...state
      };
  }
};
