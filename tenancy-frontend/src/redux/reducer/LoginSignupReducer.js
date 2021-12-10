import { ON_LOGIN, ON_SIGNUP } from "../actions/LoginSignupAction";

const initialState = {
  users: [],
  onSignUp: []
};

export default function LoginSignupReducer(state = initialState, action) {
  switch (action.type) {
    case ON_LOGIN:
      return {
        ...state,
        users: action.payload
      };
    case ON_SIGNUP:
      return {
        ...state,
        onSignUp: action.payload
      };
    default:
      return state;
  }
}
