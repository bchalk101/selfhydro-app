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

import {auth, database, provider} from "firebase";
import TempChart from "./TempChart";

export default class TelemetryPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      tempData: [],
      currentAmbientTemp: 0,
      currentUnitOneWaterTemp: 0,
      latestUpdate: ""
    };
    this.getData("original-hydro");
  }
  getData(deviceName) {
    var db = database;
    db
      .collection("devices")
      .doc(deviceName)
      .collection("telemetry")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let temp = doc.data().unitOneWaterTemp;
          console.log(doc.id, " => ", doc.data().unitTwoAmbientTemp);
          if (doc.data().time >= this.state.latestUpdate) {
            this.setState(previousState => {
              return {
                latestUpdate: doc.data().time,
                currentAmbientTemp: doc.data().unitTwoAmbientTemp,
                currentUnitOneWaterTemp: temp
              };
            });
          }
          this.setState(previousState => {
            return {tempData: [...previousState.tempData]};
          });
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  static navigationOptions = {
    title: "Sensor Data"
  };

  render() {
    let temp = this.state.tempData;
    return (
      <View style={styles.container}>
        <Text style={styles.title}> SelfHydro </Text>
        <Text> Track sensor reading and state of device </Text>

        <Text style={styles.sensorFormat}>
          Ambient Temp: {this.state.currentAmbientTemp}
        </Text>
        <Text style={styles.sensorFormat}>
          Unit One Water Temp: {this.state.currentUnitOneWaterTemp}
        </Text>
        <Text style={styles.sensorFormat}>Unit One Water Level:</Text>
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
