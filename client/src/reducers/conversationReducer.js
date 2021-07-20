export const conversationReducer = (conversations = null, action) => {
  switch (action.type) {
    case "CONVOS":
      return action.payload;
    case "NEW_CONVO":
      return [...conversations, action.payload];
    default:
      return conversations;
  }
};
