// import initialState from "./initialState";
import {
  GET_DEVICE_TELEMETRY,
  TELEMETRY_AVAILABLE
} from "../actions/actionTypes";

let telemetryState = {telemetry: [], loading: true};

export default function telemetry(state = telemetryState, action) {
  switch (action.type) {
    case GET_DEVICE_TELEMETRY:
      console.log("GET_DEVICE_TELEMETRY Action");
      return action;
    case TELEMETRY_AVAILABLE:
      state = Object.assign({}, state, {
        telemetry: action.telemetry,
        loading: false
      });
      console.log("TELEMETRY_AVAILABLE Action");
      return state;
    default:
      return state;
  }
}
