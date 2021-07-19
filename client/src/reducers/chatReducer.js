export const chatReducer = (activeChat = null, action) => {
  switch (action.type) {
    case "SELECT_CHAT":
      return action.payload;
    default:
      return activeChat;
  }
};
