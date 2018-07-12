import React, {Component} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
  Keyboard,
  StatusBar
} from "react-native";
import * as firebase from "firebase";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";
import {NavigationActions} from "react-navigation";

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: "", errorMessage: null};
  }
  handleLogin = () => {
    console.log("handleLogin");
    Keyboard.dismiss();
    const {email, password} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log("User has been authenticated");
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "drawerNavigation",
              params: {user}
            })
          ]
        });
        this.props.navigation.dispatch(resetAction);
        // this.props.navigation.navigate("drawerNavigation");
      })
      .catch(error => {
        this.setState({errorMessage: error.message});
        console.log(error.message);
      });
  };
  handleEmailAddress = email => {
    this.setState({email});
  };
  handlePassword = password => {
    this.setState({password});
  };
  render() {
    const {navigate} = this.props.navigation;
    const {errorMessage} = this.state;

    return (
      <View style={styles.container}>
        {{errorMessage} && <Text style={styles.errorText}>{errorMessage}</Text>}
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          onChangeText={this.handleEmailAddress}
          placeholderTextColor="rgba(225,225,225,0.7)"
        />
        <TextInput
          style={styles.input}
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          placeholder="Password"
          onChangeText={this.handlePassword}
          placeholderTextColor="rgba(225,225,225,0.7)"
          onSubmitEditing={Keyboard.dismiss}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleLogin}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigate("signupScreen")}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    password: state.user.password,
    errorMessage: state.user.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

const styles = StyleSheet.create({
  container: {
    padding: 20
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
