<script>
  import FeedListEntry from './FeedListEntry.svelte';
  import FolderDisplay from './FolderDisplay.svelte';
  import computeFeedData from '../util/computeFeedData';
  import { activeFeed } from '../stores/aciveItemsStore';

  export let feedStats;
  export let folders;
  export let feeds;

  let sumUnread = 0;

  $: [feedStats, folders, sumUnread] = computeFeedData(
    feedStats,
    folders,
    feeds
  );

  function setActiveFeed() {
    activeFeed.set(``);
  }
</script>

<ul class="space-y-1">
  <li>
    <button
      on:click={setActiveFeed}
      type="button"
      class="c-feed-button p-1 w-full flex items-center"
    >
      <svg
        class="w-5 h-5 mr-2 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
      <div class="flex justify-between w-full">
        <span class="line-clamp-1 mr-3">All Feeds</span>
        <span class="mr-2 font-light text-gray-600">{sumUnread}</span>
      </div>
    </button>
  </li>

  {#each folders as folder}
    <li>
      <FolderDisplay {folder} />
    </li>
  {/each}

  {#each feeds.filter((f) => f.folder_id === null) as feed}
    <li>
      <FeedListEntry feedEntry={feed} />
    </li>
  {/each}
</ul>
