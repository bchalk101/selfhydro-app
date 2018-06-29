import * as types from "./actionTypes.js";
import {auth, database, provider} from "../firebase";

export function getTelemetry(deviceName) {
  var db = database;
  return dispatch => {
    db
      .collection("devices")
      .doc(deviceName)
      .collection("currentState")
      .doc("sensorData")
      .get()
      .then(data => {
        var updateDate = formatDate(data.data().time);
        data = {
          latestUpdate: updateDate,
          currentAmbientTemp: data.data().ambientTemp,
          currentWaterTemp: data.data().waterTemp,
          currentWaterLevel: data.data().waterLevel
        };
        dispatch({type: types.TELEMETRY_AVAILABLE, telemetry: data});
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };
}

var formatDate = date => {
  var formattedDateString =
    date.slice(0, 4) +
    "/" +
    date.slice(4, 6) +
    "/" +
    date.slice(6, 8) +
    " " +
    date.slice(8, 10) +
    ":" +
    date.slice(10, 12);
  return formattedDateString;
};
