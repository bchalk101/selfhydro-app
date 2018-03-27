'use strict';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

const firebase = require("firebase");
require("firebase/firestore");

import TelemetryPage from './TelemetryPage';

const App = StackNavigator({
  Home: { screen: TelemetryPage },
});
export default App;
