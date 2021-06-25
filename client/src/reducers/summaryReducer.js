export const summaryReducer = (summary = null, action) => {
  switch (action.type) {
    case "GET_SUMMARY":
      return action.payload;
    case "GET_SUMMARY_ERROR":
      return action.payload;
    default:
      return summary;
  }
};
