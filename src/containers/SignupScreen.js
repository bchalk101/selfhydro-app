import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import * as firebase from "firebase";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: "", errorMessage: null};
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        Alert.alert(
          "Success",
          "You have successfully created a new user account",
          [
            {
              text: "Login",
              onPress: () => this.props.navigation.navigate("loginScreen")
            }
          ],
          {cancelable: false}
        );
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({errorMessage});
        console.log(errorMessage);
        return;
      });
    console.log("handleSignUp");
  };

  handleEmailAddress = email => {
    this.setState({email});
  };
  handlePassword = password => {
    this.setState({password});
  };
  render() {
    const {errorMessage} = this.state;
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
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
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={this.handlePassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleSignUp}
        >
          <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#2c3e50"
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
