const defaultFeed = { filter: "Everyone", page: 1, items: null, hasMore: true };

export const feedReducer = (feed = defaultFeed, action) => {
  switch (action.type) {
    case "FEED":
      if (feed.items) {
        return {
          ...feed,
          page: (feed.page += 1),
          items: [...feed.items, ...action.payload],
        };
      }
      if (!feed.items) {
        return { ...feed, page: (feed.page += 1), items: action.payload };
      }
      break;
    case "FEED_ERROR":
      return { ...feed, items: ["error"] };
    case "NEW_POST":
      return { ...feed, items: [action.payload, ...feed.items] };
    case "FILTER_FEED":
      return { ...feed, filter: action.payload };
    case "END_OF_FEED":
      return { ...feed, hasMore: false };
    default:
      return feed;
  }
};
