export const feedReducer = (feed = null, action) => {
  switch (action.type) {
    case "FEED":
      return action.payload;
    case "FEED_ERROR":
      return ["error"];
    case "NEW_POST":
      return [action.payload, ...feed];
    default:
      return feed;
  }
};
