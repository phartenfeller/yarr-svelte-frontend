import { cacheFeed } from './feedCache';

function computeFeedData(_feedStats, _folders, _feeds) {
  let _sumUnread = 0;

  _folders = _folders.map((f) => {
    return {
      ...f,
      feeds: _feeds.filter((feed) => feed.folder_id === f.id),
      unreadCount: 0,
    };
  });

  _feeds.forEach((f) => {
    f.unreadCount = 0;
    cacheFeed(f);
  });

  _feedStats.forEach((f) => {
    if (f.unread > 0) {
      _sumUnread += f.unread;

      const folder = _folders.find((folder) =>
        folder.feeds.some((feed) => feed.id === f.feed_id)
      );
      if (folder) folder.unreadCount += f.unread;

      const feed = _feeds.find((feed) => feed.id === f.feed_id);
      if (feed) {
        feed.unreadCount += f.unread;
      }
    }
  });

  console.log({ _feedStats, _folders, _feeds });

  return [_feedStats, _folders, _sumUnread];
}

export default computeFeedData;
