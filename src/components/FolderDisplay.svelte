<script>
  import autoAnimate from '@formkit/auto-animate';
  import FeedListEntry from './FeedListEntry.svelte';
  import { activeFeed } from '../stores/aciveItemsStore';

  export let folder;

  function handleOpen() {
    open = !open;

    fetch(`URL_BASE_PATH/api/folders/${folder.id}`, {
      headers: {
        'content-type': 'application/json',
        'x-requested-by': 'yarr',
      },
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({ is_expanded: open }),
    });
  }

  let open = folder.is_expanded ?? false;

  $: console.log({ folder });

  function setActiveFeed() {
    activeFeed.set(`folder_id=${folder.id}`);
  }
</script>

<div>
  <div class="mb-1 w-full flex items-center rounded group">
    <button
      on:click={handleOpen}
      type="button"
      class="c-feed-button ml-1 mr-[1px] py-1 h-full"
    >
      <svg
        class="w-5 h-5  text-gray-600 transition-transform {open
          ? 'rotate-90'
          : ''}"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        /></svg
      >
    </button>
    <button
      on:click={setActiveFeed}
      type="button"
      class="p-1 c-feed-button flex-grow flex justify-between"
    >
      <span class="ml-1">{folder.title}</span>
      <span class="mr-2 font-light text-gray-600">{folder.unreadCount}</span>
    </button>
  </div>
  <ul class="ml-4" use:autoAnimate>
    {#if open}
      {#each folder.feeds as feed}
        <li>
          <FeedListEntry feedEntry={feed} />
        </li>
      {/each}
    {/if}
  </ul>
</div>
