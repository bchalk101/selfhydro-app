import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  USER_SIGNED_IN
} from "../actions/actionTypes";

let userState = {email: "", password: "", errorMessage: null};

export const user = (state = userState, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      console.log("SIGN_IN_USER Action");
      return action;
    case SIGN_UP_USER:
      state = Object.assign({}, state, {});
      console.log("SIGN_UP_USER Action");
      return state;
    case USER_SIGNED_IN:
      console.log("USER_SIGNED_IN Action");
      return state;
    default:
      return state;
  }
};
