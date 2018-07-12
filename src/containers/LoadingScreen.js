import React from "react";
import {View, Text, ActivityIndicator, StyleSheet} from "react-native";
import * as firebase from "firebase";

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("Has user status");
      if (user == null) {
        this.props.navigation.navigate("loginScreen");
      } else {
        this.props.navigation.navigate("drawerNavigation");
      }
      // this.props.navigation.navigate(user ? "loginScreen" : "drawerNavigation");
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
