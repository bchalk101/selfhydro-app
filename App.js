"use strict";
import React from "react";
import {StyleSheet, View} from "react-native";
// import {StackNavigator} from "react-navigation";
import {Provider} from "react-redux";
import configureStore from "./src/store/configureStore"; //Import the store

// const firebase = require("firebase");
// require("firebase/firestore");
import AppNavigator from "./src/navigation/AppNavigation";
const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
