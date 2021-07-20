import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { dropdowReducer } from "./dropdownReducer";
import { tokenReducer } from "./tokenReducer";
import { userReducer } from "./userReducer";
import { feedReducer } from "./feedReducer";
import { viewUserReducer } from "./viewUserReducer";
import { requestsReducer } from "./requestsReducer";
import { chatReducer } from "./chatReducer";
import { isLoadingReducer } from "./isLoadingReducer";

export default combineReducers({
  user: userReducer,
  token: tokenReducer,
  activeModal: modalReducer,
  isDropdownOpen: dropdowReducer,
  feed: feedReducer,
  viewUser: viewUserReducer,
  friendRequests: requestsReducer,
  activeChat: chatReducer,
  isLoading: isLoadingReducer,
});
