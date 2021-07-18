export const viewUserReducer = (viewUser = null, action) => {
  switch (action.type) {
    case "VIEW_USER":
      return action.payload;
    case "VIEW_USER_ERROR":
      return action.payload;
    case "ACCEPT_REQ":
      //payload will be username of user
      return {
        ...viewUser,
        user: {
          ...viewUser.user,
          friends: [...viewUser.user.friends, action.payload],
        },
      };

    case "UNFRIEND":
      //payload will be username of the user
      return {
        ...viewUser,
        user: {
          ...viewUser.user,
          friends: viewUser.user.friends.filter((x) => x !== action.payload),
        },
      };
    default:
      return viewUser;
  }
};
