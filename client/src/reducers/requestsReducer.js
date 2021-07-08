export const requestsReducer = (requests = null, action) => {
  switch (action.type) {
    case "GET_REQ":
      return action.payload;
    case "SEND_REQ":
      return [...requests, action.payload];
    default:
      return requests;
  }
};
