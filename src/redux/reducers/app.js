import {
  GET_PILOTS,
  GET_PILOTS_SUCCESS,
  GET_PILOTS_FAILURE,
  UPDATE_WHALES,
  UPDATE_PILOTS,
  NEW_HEAT,
  TOGGLE_PREDATOR,
  TOGGLE_FAKE_HEAT
} from "../actions/app";

import pilots from "../../pilotOptions";

const initialState = {
  pilots: pilots,
  beacon: "red",
  fakeHeat: false,
  predatorMode: false,
  whaleOrder: ["predator", "love", "cyber", "imperial"]
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_PILOTS:
      return {
        ...state,
        pilots: action.pilots
      };
    case GET_PILOTS_SUCCESS:
      return {
        ...state,
        pilots: action.pilots
      };
    case GET_PILOTS_FAILURE:
      return {
        ...state
      };
    case UPDATE_PILOTS:
      return {
        ...state,
        selectedPilots: state.pilots.push(action.pilot)
      };
    case UPDATE_WHALES:
      return {
        ...state,
        whaleOrder: action.whaleOrder
      };
    case TOGGLE_PREDATOR:
      return {
        ...state,
        whaleOrder: action.whaleOrder,
        predatorMode: action.predatorMode
      };
    case TOGGLE_FAKE_HEAT:
      return {
        ...state,
        fakeHeat: action.fakeHeat
      };
    case NEW_HEAT:
      return {
        ...state,
        ...initialState
      };
    default:
      return {
        ...state
      };
  }
};
