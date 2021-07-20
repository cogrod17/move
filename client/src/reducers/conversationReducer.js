export const conversationReducer = (conversations = null, action) => {
  switch (action.type) {
    case "CONVOS":
      return action.payload;
    case "NEW_CONVO":
      return [...conversations, action.payload];
    case "CHAT_HISTORY":
      return conversations.map((convo) => {
        if (convo._id === action.payload.conversation_id) {
          let { data } = action.payload;
          return {
            ...convo,
            messages: [...data],
          };
        }
        return convo;
      });
    case "NEW_MESSAGE":
      return conversations.map((convo) => {
        if (convo._id === action.payload.conversation_id) {
          return { ...convo, messages: [...convo.messages, action.payload] };
        }
        return convo;
      });
    default:
      return conversations;
  }
};
