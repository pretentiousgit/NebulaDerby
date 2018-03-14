import {
  UPDATE_WHALES,
  NEW_HEAT,
  TOGGLE_PREDATOR,
  TOGGLE_FAKE_HEAT
} from "../actions/app";

import pilots from "../../static/pilotOptions";

const initialState = {
  pilots: pilots,
  beacon: "red",
  fakeHeat: false,
  predatorMode: false,
  whaleOrder: ["predator", "love", "cyber", "imperial"]
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
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
