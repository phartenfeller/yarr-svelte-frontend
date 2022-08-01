<script>
  import { activeItem } from '../../stores/aciveItemsStore';
  import { useQuery } from '@sveltestack/svelte-query';

  const REFETCH_INTERVAL = 1000 * 60 * 5;

  let itemId;
  let itemContent;

  activeItem.subscribe((value) => {
    itemId = value;
  });

  $: {
    if (itemId) {
      console.log('itemId', itemId);
      itemContent = useQuery(
        ['item-content', itemId],
        () =>
          fetch(`URL_BASE_PATH/api/items/${itemId}`).then((res) => res.json()),
        { refetchInterval: REFETCH_INTERVAL }
      );
    }
  }
</script>

<main
  class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
>
  <!-- Start main area-->
  <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
    <div class="rshadow-sm rounded-md sm:shadow-none sm:space-x-3">
      <div>
        <span class="inline-flex sm:shadow-sm">
          <button
            type="button"
            class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <!-- Heroicon name: solid/reply -->
            <svg
              class="mr-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Reply</span>
          </button>
          <button
            type="button"
            class="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <!-- Heroicon name: solid/pencil -->
            <svg
              class="mr-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              />
            </svg>
            <span>Note</span>
          </button>
          <button
            type="button"
            class="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <!-- Heroicon name: solid/user-add -->
            <svg
              class="mr-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
              />
            </svg>
            <span>Assign</span>
          </button>
        </span>
      </div>
      <div class="h-full border-2 border-gray-200 border-dashed rounded-lg">
        {itemId}
        {#if !itemContent || $itemContent.isLoading}
          <span>Loading...</span>
        {:else if $itemContent.error}
          <span>An error has occurred: {$itemContent.error.message}</span>
        {:else}
          <article>
            <div class="prose lg:prose-xl prose-p:my-4 mx-auto">
              {#if !$itemContent.data.content}
                <div>
                  {$itemContent.data.title}
                </div>
              {:else}
                <div>
                  {@html $itemContent.data.content}
                </div>
              {/if}
            </div>
          </article>
        {/if}
      </div>
    </div>
    <!-- End main area -->
  </div>
</main>
