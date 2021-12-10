import { combineReducers } from "redux";
import LoginSignupReducer from "./LoginSignupReducer";

const Reducer = combineReducers({
  user: LoginSignupReducer
});

export default Reducer;
