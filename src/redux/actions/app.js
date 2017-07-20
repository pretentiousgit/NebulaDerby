import { getPilots } from "../../ApiRequest";
import { reject } from "lodash";

// Action Types
export const GET_PILOTS = "GET_PILOTS";
export const GET_PILOTS_SUCCESS = "GET_PILOTS_SUCCESS";
export const GET_PILOTS_FAILURE = "GET_PILOTS_FAILURE";

export const UPDATE_PILOTS = "UPDATE_PILOTS";

export function retrievePilots() {
  return dispatch => {
    dispatch({
      type: GET_PILOTS
    });

    getPilots().then(
      pilots => {
        dispatch({
          type: GET_PILOTS_SUCCESS,
          pilots: pilots
        });
      },
      err => {
        console.log(err);
      }
    );
  };
}

export const updatePilots = (pilot, list) => ({
  type: UPDATE_PILOTS,
  pilots: reject(list, o => (o.name = pilot.name))
});
