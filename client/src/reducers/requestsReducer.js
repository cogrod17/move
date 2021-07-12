export const requestsReducer = (friendRequests = null, action) => {
  switch (action.type) {
    case "GET_REQ":
      return action.payload;
    case "SEND_REQ":
      return [...friendRequests, action.payload];
    default:
      return friendRequests;
  }
};
