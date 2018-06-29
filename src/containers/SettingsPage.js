"use strict";

import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  SegmentedControlIOS
} from "react-native";

import {auth, database, provider} from "../firebase";

import HeaderButtons from "react-navigation-header-buttons";
import Icon from "react-native-vector-icons/Ionicons";

const ledHrsOn = ["8", "10", "12", "16", "18"];
const breakHrs = ["15m", "30m", "45m", "1Hr", "2Hrs", "4Hrs", "8Hrs"];
let _this = null;

export default class SettingsPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {ledSelectedIndex: 0, airSelectedIndex: 0};
    this.getCurrentConfig("original-hydro");
  }

  componentDidMount() {
    _this = this;
  }

  static navigationOptions = ({navigation}) => {
    const state = navigation.state || {};
    return {
      headerTitle: "How do you want to set me up?",
      headerRight: (
        <HeaderButtons IconComponent={Icon} iconSize={23} color="white">
          <HeaderButtons.Item
            title="Save"
            onPress={() => {
              alert("Saving settings");
              _this.saveSettingChanges("original-hydro");
            }}
          />
        </HeaderButtons>
      )
    };
  };

  getCurrentConfig(deviceName) {
    var db = database;
    db
      .collection("devices")
      .doc(deviceName)
      .get()
      .then(doc => {
        let growLEDOnHrs = doc.data().growLEDOnHrs;
        console.log(doc.id, " => ", growLEDOnHrs);
        let ledIndex = this.findIndexOfValue(growLEDOnHrs);
        this.setState(previousState => {
          return {
            ledSelectedIndex: ledIndex
          };
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  findIndexOfValue(value) {
    for (var i = 0; i < ledHrsOn.length; i++) {
      if (ledHrsOn[i] == value) {
        return i;
      }
    }
    return -1;
  }

  saveSettingChanges(deviceName) {
    var db = database;
    let newHrsOn = ledHrsOn[this.state.ledSelectedIndex];
    console.log(newHrsOn);
    db
      .collection("devices")
      .doc(deviceName)
      .update({
        growLEDOnHrs: newHrsOn
      });
  }

  render() {
    var ledOnHrs = ledHrsOn[this.state.ledSelectedIndex];
    var airOnHrs = breakHrs[this.state.airSelectedIndex];
    return (
      <View style={styles.container}>
        <Text style={styles.sensorFormat}> Grow LEDs On Duration </Text>
        <Text> On Hrs: {ledOnHrs} </Text>
        <SegmentedControlIOS
          style={styles.selector}
          values={ledHrsOn}
          selectedIndex={this.state.ledSelectedIndex}
          tintColor="#111"
          onChange={event => {
            this.setState({
              selectedIndex: event.nativeEvent.selectedSegmentIndex
            });
          }}
        />
        <Text style={styles.sensorFormat}> Air Pump Frequency </Text>
        <Text> On every {airOnHrs} </Text>
        <SegmentedControlIOS
          style={styles.selector}
          values={breakHrs}
          selectedIndex={this.state.airSelectedIndex}
          tintColor="#111"
          onChange={event => {
            this.setState({
              selectedIndex: event.nativeEvent.selectedSegmentIndex
            });
          }}
        />
        <Text style={styles.sensorFormat}>Automatic Updates</Text>
        <Text> on/Off </Text>
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
    fontSize: 20,
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
  },
  selector: {
    marginTop: 20,
    width: 300
  }
});
