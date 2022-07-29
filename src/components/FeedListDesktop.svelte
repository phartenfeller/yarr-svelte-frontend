<script>
  import FeedListEntry from './FeedListEntry.svelte';
  import FolderDisplay from './FolderDisplay.svelte';
  import computeFeedData from '../util/computeFeedData';

  export let feedStats;
  export let folders;
  export let feeds;

  $: [feedStats, folders] = computeFeedData(feedStats, folders, feeds);
</script>

<ul class="space-y-1">
  {#each folders as folder}
    <li class="">
      <FolderDisplay {folder} />
    </li>
  {/each}

  {#each feeds.filter((f) => f.folder_id === null) as feed}
    <li>
      <FeedListEntry feedEntry={feed} />
    </li>
  {/each}
</ul>
