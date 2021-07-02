import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { dropdowReducer } from "./dropdownReducer";
import { tokenReducer } from "./tokenReducer";
import { userReducer } from "./userReducer";
import { historyReducer } from "./historyReducer";
import { summaryReducer } from "./summaryReducer";
import { feedReducer } from "./feedReducer";
import { viewUserReducer } from "./viewUserReducer";

export default combineReducers({
  user: userReducer,
  token: tokenReducer,
  activeModal: modalReducer,
  isDropdownOpen: dropdowReducer,
  workoutHistory: historyReducer,
  summary: summaryReducer,
  feed: feedReducer,
  viewUser: viewUserReducer,
});
