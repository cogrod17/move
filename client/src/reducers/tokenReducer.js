export const tokenReducer = (token = null, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.payload;
    default:
      return token;
  }
};
