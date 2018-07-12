import {combineReducers} from "redux";
import telemetry from "./telemetryReducer";
import user from "./userReducer";
const rootReducer = combineReducers({
  telemetry,
  user
});

export default rootReducer;
