const feedMap = new Map();

export function cacheFeed(feed) {
  if (feedMap.has(feed.id)) {
    return;
  }
  feedMap.set(feed.id, feed.title);
}

export function getFeedTitle(id) {
  return feedMap.get(id);
}
