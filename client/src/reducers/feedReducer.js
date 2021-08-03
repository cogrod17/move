const defaultFeed = { filter: "Everyone", items: null };

export const feedReducer = (feed = defaultFeed, action) => {
  switch (action.type) {
    case "FEED":
      return { ...feed, items: action.payload };
    case "FEED_ERROR":
      return { ...feed, items: ["error"] };
    case "NEW_POST":
      return { ...feed, items: [action.payload, ...feed.items] };
    case "FILTER_FEED":
      return { ...feed, filter: action.payload };
    default:
      return feed;
  }
};
