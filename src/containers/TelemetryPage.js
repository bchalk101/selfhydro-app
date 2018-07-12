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

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";

import {StackNavigator} from "react-navigation";

import {auth, database, provider} from "../firebase";

export class TelemetryPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getTelemetry("original-hydro");
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: "How am I doing?",
      drawerLabel: "Device Telemetry",
      headerRight: (
        <HeaderButtons IconComponent={Icon} iconSize={23} color="white">
          <HeaderButtons.Item
            title="Settings"
            iconName="ios-settings"
            onPress={() => navigation.navigate("settingsPage")}
          />
        </HeaderButtons>
      )
    };
  };

  render() {
    if (this.props.loading) {
      return (
        <View style={styles.container}>
          <Text> Loading... </Text>
        </View>
      );
    } else {
      let temp = this.state.tempData;
      return (
        <View style={styles.container}>
          <Text style={styles.title}> SelfHydro </Text>
          <Text> Track sensor reading and state of device </Text>

          <Text style={styles.sensorFormat}>
            Ambient Temp: {this.props.telemetry.currentAmbientTemp} &#8451;
          </Text>
          <Text style={styles.sensorFormat}>
            Water Temp: {this.props.telemetry.currentWaterTemp} &#8451;
          </Text>
          <Text style={styles.sensorFormat}>
            Water Level: {this.props.telemetry.currentWaterLevel}
          </Text>
          <Text style={{marginTop: 10}}>
            Last Updated: {this.props.telemetry.latestUpdate}
          </Text>
        </View>
      );
    }
  }
}

// TelemetryPage.propTypes = {
//   telemteryActions: PropTypes.object,
//   telemetry: PropTypes.array
// };

function mapStateToProps(state) {
  return {
    loading: state.telemetry.loading,
    telemetry: state.telemetry.telemetry
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TelemetryPage);

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
