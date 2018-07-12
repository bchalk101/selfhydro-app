import React from "react";
import {Text} from "react-native";
import {StackNavigator, DrawerNavigator} from "react-navigation";
import HeaderButtons from "react-navigation-header-buttons";
import Icon from "react-native-vector-icons/Ionicons";

import ForgottenPasswordScreen from "../containers/ForgottenPasswordScreen";
import LoginScreen from "../containers/LoginScreen";
import TelemetryPage from "../containers/TelemetryPage";
import SettingsPage from "../containers/SettingsPage";
import AddDeviceScreen from "../containers/AddDeviceScreen";
import SignupScreen from "../containers/SignupScreen";
import LoadingScreen from "../containers/LoadingScreen";

const DrawerStack = DrawerNavigator({
  telemetry: {screen: TelemetryPage},
  addDevice: {screen: AddDeviceScreen}
});

const DrawerNavigation = StackNavigator(
  {
    drawerStack: {screen: DrawerStack}
  },
  {
    headerMode: "screen",
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: "#000080"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: (
        <HeaderButtons IconComponent={Icon} iconSize={23} color="white">
          <HeaderButtons.Item
            title="Settings"
            iconName="ios-menu"
            onPress={() => navigation.navigate("DrawerToggle")}
          />
        </HeaderButtons>
      )
    })
  }
);

const SettingsNavigation = StackNavigator(
  {
    settingsPage: {screen: SettingsPage}
  },
  {
    headerMode: "screen"
  }
);

const LoginStack = StackNavigator(
  {
    loginScreen: {screen: LoginScreen},
    signupScreen: {screen: SignupScreen},
    forgottenPasswordScreen: {
      screen: ForgottenPasswordScreen,
      navigationOptions: {title: "Forgot Password"}
    }
  },
  {
    headerMode: "none"
  }
);

const AppNavigator = StackNavigator(
  {
    loading: {screen: LoadingScreen},
    loginStack: {screen: LoginStack},
    drawerNavigation: {screen: DrawerNavigation},
    settingsNavigation: {screen: SettingsNavigation}
  },
  {
    initialRouteName: "loading",
    // title: "Main",
    headerMode: "none"
  }
);

export default AppNavigator;
