<script>
  import autoAnimate from '@formkit/auto-animate';
  import FeedListEntry from './FeedListEntry.svelte';

  export let folder;
  export let feeds = [];

  function handleClick() {
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
</script>

<div>
  <button
    on:click={handleClick}
    type="button"
    class="p-1 mb-1 w-full flex items-center rounded hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-300"
  >
    <svg
      class="w-4 h-4 mr-2 text-gray-600 transition-transform {open
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
    <span>{folder.title}</span>
  </button>
  <ul class="ml-4 {open ? 'block' : 'hidden'}" use:autoAnimate>
    {#each feeds as feed}
      <FeedListEntry feedEntry={feed} />
    {/each}
  </ul>
</div>
