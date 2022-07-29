<script>
  import { useQuery } from '@sveltestack/svelte-query';
  import FeedListEntry from './FeedListEntry.svelte';
  import FolderDisplay from './FolderDisplay.svelte';

  const statusResult = useQuery('statusData', () =>
    fetch('URL_BASE_PATH/api/status').then((res) => res.json())
  );

  const folders = useQuery('folderData', () =>
    fetch('URL_BASE_PATH/api/folders').then((res) => res.json())
  );

  const feeds = useQuery('feedsData', () =>
    fetch('URL_BASE_PATH/api/feeds').then((res) => res.json())
  );
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
            {#if $statusResult.isLoading || $folders.isLoading || $feeds.isLoading}
              <span>Loading...</span>
            {:else if $statusResult.error}
              <span>An error has occurred: {$statusResult.error.message}</span>
            {:else if $folders.error}
              <span>An error has occurred: {$folders.error.message}</span>
            {:else if $feeds.error}
              <span>An error has occurred: {$feeds.error.message}</span>
            {:else}
              <ul class="space-y-1">
                {#each $folders.data as folder}
                  <li class="">
                    <FolderDisplay
                      {folder}
                      feeds={$feeds.data.filter(
                        (f) => f.folder_id === folder.id
                      )}
                    />
                  </li>
                {/each}

                {#each $feeds.data.filter((f) => f.folder_id === null) as feed}
                  <li>
                    <FeedListEntry feedEntry={feed} />
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        </nav>
      </div>
      <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
        <a href="#" class="flex-shrink-0 w-full group block"> GitHub </a>
      </div>
    </div>
  </div>
</div>
