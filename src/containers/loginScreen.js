"use strict";
import React, {Component} from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView} from "react-native";

import LoginForm from "./LoginForm";
import * as firebase from "firebase";

export default class LoginScreen extends Component<{}> {
  componentDidMount() {}
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer} />

        <View style={styles.formContainer}>
          <LoginForm navigation={this.props.navigation} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50"
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logo: {
    position: "absolute",
    width: 300,
    height: 100
  },
  linky: {
    fontWeight: "bold",
    color: "#4C3E54",
    paddingTop: 10
  }
});
