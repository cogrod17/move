export const modalReducer = (openForm = null, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return action.payload;
    case "CLOSE_MODAL":
      return null;
    default:
      return openForm;
  }
};
