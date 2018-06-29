import {combineReducers} from "redux";
import telemetry from "./telemetryReducer";

const rootReducer = combineReducers({
  telemetry
});

export default rootReducer;
