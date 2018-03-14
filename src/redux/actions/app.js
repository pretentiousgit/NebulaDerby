import move from "lodash-move";

// Action Types
export const UPDATE_WHALES = "UPDATE_WHALES";

export const TOGGLE_PREDATOR = "TOGGLE_PREDATOR";
export const TOGGLE_FAKE_HEAT = "TOGGLE_FAKE_HEAT";

export const NEW_HEAT = "NEW_HEAT";

export function updateWhaleOrder(whaleOrder) {
  return dispatch => {
    dispatch({
      type: UPDATE_WHALES,
      whaleOrder: whaleOrder
    });
  };
}

export function togglePredatorMode(whaleOrder, predatorMode) {
  const newOrder = predatorMode
    ? move(whaleOrder, whaleOrder.indexOf("predator"), 2)
    : whaleOrder;

  return dispatch => {
    dispatch({
      type: TOGGLE_PREDATOR,
      predatorMode: predatorMode,
      whaleOrder: newOrder
    });
  };
}

export function newHeat() {
  return dispatch => {
    dispatch({
      type: NEW_HEAT
    });
  };
}

export function toggleFakeHeat(toggleValue) {
  return dispatch => {
    dispatch({
      type: TOGGLE_FAKE_HEAT,
      fakeHeat: toggleValue
    });
  };
}
