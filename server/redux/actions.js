// Action Types
const START_RACE = "START_RACE";
const STOP_RACE = "STOP_RACE";
const RESET_RACE = "RESET_RACE";
const RE_ORDER_RACE_POSITIONS = "RE_ORDER_RACE_POSITIONS";
const UPDATE_RACE_POSITIONS = "UPDATE_RACE_POSITIONS";

// Actions
function resetRace() {
  return dispatch => {
    dispatch({
      type: RESET_RACE
    });
  };
}

function startRace() {
  return dispatch => {
    dispatch({
      type: START_RACE
    });
  };
}

function updateRacePositions() {
  return dispatch => {
    dispatch({
      type: UPDATE_RACE_POSITIONS
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
  updateRacePositions
});
