<script lang="ts">
  import Gamebox from '$lib/gamebox.svelte';
  import secrets from '$lib/secrets.json';
  import { derived } from 'svelte/store';

  let { data } = $props()
  
  const games = data.games;
  const genrelist = data.genres;
  const coverlist = data.covers;

  let searchTerm : string  = $state("");
  let filteredGames : any[] = $state([]);
  let filteredCovers : any[] = [];

  async function gameSearch() {
    searchTerm = searchTerm.toLowerCase();
    const searchedGame = await fetch(`/search?searchTerm=${searchTerm}`);
    const searchedGameData = await searchedGame.json();
    filteredGames = searchedGameData.data;
    filteredCovers = searchedGameData.covers;
  }

</script>

<h1 class="p-4 text-2xl font-bold">{"Search Games"}</h1>

<input
  type="text"
  placeholder="Search for a game..."
  class="p-2 mx-4 text-black border rounded"
  bind:value={searchTerm}
/>
<button
  class="p-2 bg-blue-500 text-white rounded"
  onclick={() => gameSearch()}
>
  {"Search"}  
</button>

<h1 class="p-4 text-2xl font-bold">{"Popular Games"}</h1>

<div class="grid grid-cols-5 gap-4 p-4">
  {#if searchTerm === ""}
    {#each games as game,i}
      <Gamebox 
        title={game.name} 
        genres={game.genres ? game.genres.map((x: number) => genrelist.find((y: any) => y.id === x).name) : []}
        id={game.id}
        cover={game.cover ? coverlist.find((y: any) => y.id === game.cover).url.replace("t_thumb","t_cover_big") : ""}
      />
    {/each}
  {:else}
    {#each filteredGames as game, i}
      <Gamebox 
        title={game.name} 
        genres={game.genres ? game.genres.map((x: number) => genrelist.find((y: any) => y.id === x).name) : []}
        id={game.id}
        cover={game.cover ? filteredCovers.find((y: any) => y.id === game.cover).url.replace("t_thumb","t_cover_big") : ""}
      />
    {/each}
  {/if}
</div>