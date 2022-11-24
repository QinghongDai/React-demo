import { combineReducers } from "redux";
import auth from "./auth";
import root from "./root";

export default combineReducers({
  auth,
  root
});
