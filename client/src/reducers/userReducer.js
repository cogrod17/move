export const userReducer = (user = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "FRIEND_REQUESTS":
      return { ...user, requestsReceived: action.payload };
    default:
      return user;
  }
};
