import { reject } from "lodash";
import move from "lodash-move";

// Action Types
export const GET_PILOTS = "GET_PILOTS";
export const GET_PILOTS_SUCCESS = "GET_PILOTS_SUCCESS";
export const GET_PILOTS_FAILURE = "GET_PILOTS_FAILURE";

export const UPDATE_PILOTS = "UPDATE_PILOTS";
export const UPDATE_WHALES = "UPDATE_WHALES";

export const TOGGLE_PREDATOR = "TOGGLE_PREDATOR";

export function updatePilots(pilot, list) {
  return dispatch => {
    dispatch({
      type: UPDATE_PILOTS,
      pilots: reject(list, o => o.text === pilot)
    });
  };
}

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
    ? move(whaleOrder, whaleOrder.indexOf("Savage"), 2)
    : whaleOrder;

  return dispatch => {
    dispatch({
      type: TOGGLE_PREDATOR,
      predatorMode: predatorMode,
      whaleOrder: newOrder
    });
  };
}
