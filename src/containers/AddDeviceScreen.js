"use strict";
import React, {Component} from "react";
import HeaderButtons from "react-navigation-header-buttons";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class AddDeviceScreen extends Component<{}> {
  static navigationOptions = ({navigation}) => {
    return {
      drawerLabel: "Add New Device",
      headerTitle: "Add a New Device"
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Device ID"
          onChangeText={this.handleEmailAddress}
          placeholderTextColor="rgba(225,225,225,0.7)"
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleAddDevice}
        >
          <Text style={styles.buttonText}>Add Device</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000080"
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#fff"
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15,
    marginBottom: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  errorText: {
    color: "#cc0000",
    textAlign: "center",
    fontWeight: "700"
  }
});
