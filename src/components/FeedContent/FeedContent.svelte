<script>
  import { activeFeed, activeItem } from '../../stores/aciveItemsStore';
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

  function handleClick(itemId) {
    activeItem.set(itemId);
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
  <div class="absolute inset-0 py-6 px-2 sm:px-3 lg:px-4">
    {#if !feedContent || $feedContent.isLoading}
      <span>Loading...</span>
    {:else if $feedContent.error}
      <span>An error has occurred: {$feedContent.error.message}</span>
    {:else}
      <ul class="space-y-1">
        {#each $feedContent.data.list as content}
          <li>
            <button
              on:click={() => handleClick(content.id)}
              class="c-feed-button px-4 py-2 w-full text-left"
            >
              <div class="text-sm flex justify-between text-gray-500">
                <span class="flex line-clamp-1">
                  {#if content.status === 'unread'}
                    <span class="mr-0.5 text-teal-400/50">●</span>
                  {/if}
                  <span class="">{getFeedTitle(content.feed_id)}</span>
                </span>
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
