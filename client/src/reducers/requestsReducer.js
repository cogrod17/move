export const requestsReducer = (friendRequests = [], action) => {
  switch (action.type) {
    case "GET_REQ":
      return action.payload;
    case "SEND_REQ":
      return [...friendRequests, action.payload];
    case "DECLINE_REQ":
      return friendRequests.filter((req) => req._id !== action.payload);
    default:
      return friendRequests;
  }
};
