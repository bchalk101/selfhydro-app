"use strict";

import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image
} from "react-native";
import HeaderButtons from "react-navigation-header-buttons";
import Icon from "react-native-vector-icons/Ionicons";

import {StackNavigator} from "react-navigation";

import {auth, database, provider} from "./firebase";
import TempChart from "./TempChart";

export default class TelemetryPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      currentAmbientTemp: 0,
      currentWaterTemp: 0,
      currentWaterLevel: 0,
      latestUpdate: ""
    };
    this.getData("original-hydro");
  }

  formatDate(date) {
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
  }

  getData(deviceName) {
    var db = database;
    db
      .collection("devices")
      .doc(deviceName)
      .collection("currentState")
      .doc("sensorData")
      .get()
      .then(data => {
        var updateDate = this.formatDate(data.data().time);
        this.setState(() => {
          return {
            latestUpdate: updateDate,
            currentAmbientTemp: data.data().ambientTemp,
            currentWaterTemp: data.data().waterTemp,
            currentWaterLevel: data.data().waterLevel
          };
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: "How am I doing?",
      headerRight: (
        <HeaderButtons IconComponent={Icon} iconSize={23} color="white">
          <HeaderButtons.Item
            title="Settings"
            iconName="ios-settings"
            onPress={() => navigation.navigate("Settings")}
          />
        </HeaderButtons>
      )
    };
  };

  render() {
    let temp = this.state.tempData;
    return (
      <View style={styles.container}>
        <Text style={styles.title}> SelfHydro </Text>
        <Text> Track sensor reading and state of device </Text>

        <Text style={styles.sensorFormat}>
          Ambient Temp: {this.state.currentAmbientTemp} &#8451;
        </Text>
        <Text style={styles.sensorFormat}>
          Water Temp: {this.state.currentWaterTemp} &#8451;
        </Text>
        <Text style={styles.sensorFormat}>
          Water Level: {this.state.currentWaterLevel}
        </Text>
        <Text style={{marginTop: 10}}>
          Last Updated: {this.state.latestUpdate}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
    // justifyContent: "center"
  },
  title: {
    color: "#111",
    fontSize: 30,
    fontWeight: "300",
    lineHeight: 32,
    textAlign: "center",
    marginTop: 20
  },
  sensorFormat: {
    color: "#111",
    fontSize: 20,
    fontWeight: "200",
    lineHeight: 32,
    textAlign: "left",
    marginTop: 20
  }
});
