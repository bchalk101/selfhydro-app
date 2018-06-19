"use strict";
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {StackNavigator} from "react-navigation";

const firebase = require("firebase");
require("firebase/firestore");

import TelemetryPage from "./TelemetryPage";
import SettingsPage from "./SettingsPage";

const App = StackNavigator(
  {
    Telemetry: {screen: TelemetryPage},
    Settings: {screen: SettingsPage}
  },
  {
    initialRouteName: "Telemetry",
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#000080"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
export default App;
