export const viewUserReducer = (viewUser = null, action) => {
  switch (action.type) {
    case "VIEW_USER":
      return action.payload;
    case "VIEW_USER_ERROR":
      return action.payload;
    default:
      return viewUser;
  }
};
