export const requestsReducer = (friendRequests = null, action) => {
  switch (action.type) {
    case "GET_REQ":
      return action.payload;
    case "SEND_REQ":
      return {
        sent: [...friendRequests.sent, action.payload],
        received: friendRequests.received,
      };
    default:
      return friendRequests;
  }
};
