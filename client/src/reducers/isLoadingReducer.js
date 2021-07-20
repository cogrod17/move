export const isLoadingReducer = (isLoading = true, action) => {
  switch (action.type) {
    case "LOADING":
      return action.payload;
    default:
      return isLoading;
  }
};
