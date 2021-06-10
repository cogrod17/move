import { combineReducers } from "redux";
import { toggleFormReducer } from "./toggleFormReducer";
import { dropdowReducer } from "./dropdownReducer";

export default combineReducers({
  activeForm: toggleFormReducer,
  isDropdownOpen: dropdowReducer,
});
