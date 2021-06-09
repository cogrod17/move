export const toggleFormReducer = (openForm = null, action) => {
  switch (action.type) {
    case "OPEN_FORM":
      return action.payload;
    case "CLOSE_FORM":
      return null;
    default:
      return openForm;
  }
};
