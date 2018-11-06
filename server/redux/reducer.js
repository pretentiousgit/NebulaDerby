const Action = require("./actions").actionTypes;
// reduce them to the new state
const initialState = require('../config.initialState');

function returnState(state, action) {
  return { ...state };
}

function objectUpdate(state, newItems) {
  const update = {
    ...state,
    ...newItems
  };
  return update;
}

const options = {
  [Action.START_RACE]: objectUpdate,
  [Action.STOP_RACE]: objectUpdate,
  [Action.REORDER_RACE_POSITIONS]: objectUpdate,
  [Action.UPDATE_RACE_POSITIONS]: objectUpdate,
  [Action.TRANZONIC]: returnState,
  [Action.GALACTAGASM]: returnState,
  [Action.FLEET_ATTACK]: objectUpdate
};

module.exports = (state = initialState, action = {}) => {
  console.log('server action', action);
  let cleanState = state;
  if (state.error && action.type !== Action.CATCH_ERROR) {
    cleanState = { ...state, error: { messages: [] } };
  }
  const func = options[action.type] || returnState;
  return func(cleanState, action);
};
