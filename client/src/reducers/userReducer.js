export const userReducer = (user = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "FRIEND_REQUESTS":
      return { ...user, requestsReceived: action.payload };
    case "LOGIN_ERROR":
      return { error: "Incorrect username or password" };
    default:
      return user;
  }
};
