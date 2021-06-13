import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { dropdowReducer } from "./dropdownReducer";

export default combineReducers({
  activeModal: modalReducer,
  isDropdownOpen: dropdowReducer,
});
