import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { dropdowReducer } from "./dropdownReducer";
import { tokenReducer } from "./tokenReducer";
import { userReducer } from "./userReducer";
import { feedReducer } from "./feedReducer";
import { viewUserReducer } from "./viewUserReducer";
import { requestsReducer } from "./requestsReducer";
import { chatReducer } from "./chatReducer";

export default combineReducers({
  user: userReducer,
  token: tokenReducer,
  activeModal: modalReducer,
  isDropdownOpen: dropdowReducer,
  feed: feedReducer,
  viewUser: viewUserReducer,
  friendRequests: requestsReducer,
  activeChat: chatReducer,
});
