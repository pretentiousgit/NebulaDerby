import {
  GET_PILOTS,
  GET_PILOTS_SUCCESS,
  GET_PILOTS_FAILURE,
  UPDATE_PILOTS
} from "../actions/app";

const initialState = {
  pilots: []
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
        pilots: action.pilots
      };
    default:
      return {
        ...state
      };
  }
};
