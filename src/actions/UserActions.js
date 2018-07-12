import * as types from "./actionTypes.js";

export const handleLogin = () => {
  console.log("handleLogin");

  const {email, password} = this.state;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User has been authenticated");
      dispatch({type: USER_SIGNED_IN});
      this.props.navigation.navigate("drawerNavigation");
    })
    .catch(error => {
      this.setState({errorMessage: error.message});
      console.log(error.message);
    });
};
