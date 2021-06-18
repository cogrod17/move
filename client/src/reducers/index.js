import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { dropdowReducer } from "./dropdownReducer";
import { tokenReducer } from "./tokenReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
  user: userReducer,
  token: tokenReducer,
  activeModal: modalReducer,
  isDropdownOpen: dropdowReducer,
});
