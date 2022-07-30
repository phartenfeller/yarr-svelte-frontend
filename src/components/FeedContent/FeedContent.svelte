<script>
  import { activeFeed } from '../../stores/aciveItemsStore';
  import { useQuery } from '@sveltestack/svelte-query';
  import getDateString from '../../util/getDateString';
  import { getFeedTitle } from '../../util/feedCache';

  const REFETCH_INTERVAL = 1000 * 60 * 5;

  let feedQuery;
  let url;
  let feedContent;

  function getFeedUrl(_feedQuery) {
    let path;
    console.log('getFeedUrl', _feedQuery);
    if (_feedQuery) {
      path = `/api/items?${_feedQuery}&status=unread`;
    } else {
      path = `/api/items?status=unread`;
    }

    const url = `URL_BASE_PATH${path}`;

    return url;
  }

  activeFeed.subscribe((value) => {
    feedQuery = value;
  });

  $: url = getFeedUrl(feedQuery);

  $: feedContent = useQuery(
    ['feed-content', feedQuery],
    () => fetch(url).then((res) => res.json()),
    { refetchInterval: REFETCH_INTERVAL }
  );
</script>

<aside
  class="hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-y-auto"
>
  {feedQuery}
  <!-- Start secondary column (hidden on smaller screens) -->
  <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
    {#if !feedContent || $feedContent.isLoading}
      <span>Loading...</span>
    {:else if $feedContent.error}
      <span>An error has occurred: {$feedContent.error.message}</span>
    {:else}
      <ul>
        {#each $feedContent.data.list as content}
          <li>
            <button class="c-feed-button p-1 w-full text-left">
              <div class="text-sm flex justify-between">
                <span class="line-clamp-1">{getFeedTitle(content.feed_id)}</span
                >
                <span>
                  {getDateString(new Date(content.date))}
                </span>
              </div>
              <span class="line-clamp-2">{content.title}</span>
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  <!-- End secondary column -->
</aside>
