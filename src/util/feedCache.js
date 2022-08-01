const feedMap = new Map();

let writeTimeout = null;

/**
 * Necessary because of race conditions
 */
function writeToLocalStorage() {
  const json = Object.fromEntries(feedMap);
  localStorage.setItem('feedMap', JSON.stringify(json));
}

function retrieveLocalStorage() {
  const json = localStorage.getItem('feedMap');
  if (json) {
    const map = JSON.parse(json);
    Object.entries(map).forEach(([key, value]) => {
      feedMap.set(parseInt(key), value);
    });
  }
}

export function cacheFeed(feed) {
  if (feedMap.has(feed.id)) {
    return;
  }

  feedMap.set(feed.id, feed.title);
  if (writeTimeout) {
    clearTimeout(writeTimeout);
  }
  writeTimeout = setTimeout(() => {
    writeToLocalStorage();
  }, 1000);
}

export function getFeedTitle(id) {
  if (!feedMap.has(id)) {
    retrieveLocalStorage();

    if (!feedMap.has(id)) {
      console.warn(`No feed title found for feed_id: ${id}`);
      return 'loading...';
    }
  }

  return feedMap.get(id);
}
