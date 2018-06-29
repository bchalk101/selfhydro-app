"use strict";
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {StackNavigator} from "react-navigation";
import {Provider} from "react-redux";
import configureStore from "./src/store/configureStore"; //Import the store

const firebase = require("firebase");
require("firebase/firestore");

import TelemetryPage from "./src/containers/TelemetryPage";
import SettingsPage from "./src/containers/SettingsPage";

const store = configureStore();

export const Navigator = StackNavigator(
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

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
