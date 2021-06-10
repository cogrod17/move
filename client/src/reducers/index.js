import { combineReducers } from "redux";
import { toggleFormReducer } from "./toggleFormReducer";

export default combineReducers({
  activeForm: toggleFormReducer,
});
