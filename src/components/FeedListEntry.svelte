<script>
  export let feedEntry;
</script>

<button
  type="button"
  class="p-1 w-full flex items-center rounded hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-300"
>
  {#if feedEntry.has_icon}
    <img
      class="h-4 w-4 mr-2"
      src={`URL_BASE_PATH/api/feeds/${feedEntry.id}/icon`}
      alt=""
      loading="lazy"
    />
  {:else}
    <svg
      class="w-4 h-4 mr-2 text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      /></svg
    >
  {/if}
  <span>{feedEntry.title}</span>
</button>
