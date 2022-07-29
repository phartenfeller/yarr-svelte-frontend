<script>
  import { useQuery } from '@sveltestack/svelte-query';
  import FeedListDesktop from './FeedListDesktop.svelte';

  const REFETCH_INTERVAL = 1000 * 60 * 5;

  const feedStats = useQuery(
    'statusData',
    () => fetch('URL_BASE_PATH/api/status').then((res) => res.json()),
    { refetchInterval: REFETCH_INTERVAL }
  );

  const folders = useQuery(
    'folderData',
    () => fetch('URL_BASE_PATH/api/folders').then((res) => res.json()),
    { refetchInterval: REFETCH_INTERVAL }
  );

  const feeds = useQuery(
    'feedsData',
    () => fetch('URL_BASE_PATH/api/feeds').then((res) => res.json()),
    { refetchInterval: REFETCH_INTERVAL }
  );

  $: statsData = $feedStats.data;
  $: foldersData = $folders.data;
  $: feedData = $feeds.data;

  console.log('statsData', statsData);
</script>

<!-- Static sidebar for desktop -->
<div class="hidden lg:flex lg:flex-shrink-0">
  <div class="flex flex-col w-64">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100"
    >
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">New etc</div>
        <nav class="mt-5 flex-1" aria-label="Sidebar">
          <div class="px-2 space-y-1">
            <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
            {#if $feedStats.isLoading || $folders.isLoading || $feeds.isLoading}
              <span>Loading...</span>
            {:else if $feedStats.error}
              <span>An error has occurred: {$feedStats.error.message}</span>
            {:else if $folders.error}
              <span>An error has occurred: {$folders.error.message}</span>
            {:else if $feeds.error}
              <span>An error has occurred: {$feeds.error.message}</span>
            {:else if !statsData || !foldersData || !feedData}
              <span>Not all data found?!</span>
            {:else}
              <FeedListDesktop
                folders={foldersData}
                feedStats={statsData.stats}
                feeds={feedData}
              />
            {/if}
          </div>
        </nav>
      </div>
      <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
        <a
          href="https://github.com/phartenfeller/yarr-svelte-frontend"
          class="flex-shrink-0 w-full group block">GitHub</a
        >
      </div>
    </div>
  </div>
</div>
