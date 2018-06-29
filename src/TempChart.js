import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  Text
} from "react-native";
import {LineChart, XAxis, YAxis} from "react-native-svg-charts";
import * as shape from "d3-shape";

export default class TempChart extends React.PureComponent {
  render() {
    const verticalContentInset = {top: 10, bottom: 10};
    const axesSvg = {fontSize: 10, fill: "grey"};

    return (
      <View style={{flexDirection: "row", height: 200}}>
        <LineChart
          style={{flex: 1}}
          data={this.props.tempData}
          svg={{stroke: "rgb(134, 65, 244)"}}
          contentInset={{top: 20, bottom: 20}}
        />
      </View>
    );
  }
}
