<script lang="ts">
  import Gamebox from '$lib/gamebox.svelte';
  import secrets from '../../secrets.json';
  import { derived } from 'svelte/store';
  import {SyncLoader} from 'svelte-loading-spinners';

  let { data } = $props()
  
  const games = data.games;
  const genrelist = data.genres;
  const coverlist = data.covers;

  let searchTerm : string  = $state("");
  let filteredGames : any[] = $state([]);
  let filteredCovers : any[] = [];
  let searchLoading : boolean = $state(false);

  async function gameSearch() {
    searchLoading = true;
    searchTerm = searchTerm.toLowerCase();
    const searchedGame = await fetch(`/search?searchTerm=${searchTerm}`);
    const searchedGameData = await searchedGame.json();
    filteredGames = searchedGameData.data;
    filteredCovers = searchedGameData.covers;
    searchLoading = false;
  }

</script>

<h1 class="p-4 text-2xl text-center font-bold">{"Search Games"}</h1>

<div class="flex justify-center my-4">
  <input
    type="text"
    placeholder="Search for a game..."
    class="p-4 text-black border rounded w-1/2"
    bind:value={searchTerm}
    onkeydown={(e) => e.key === 'Enter' && gameSearch()}
  />
</div>
<div class="flex justify-center my-4">
  <button
    class="p-2 bg-blue-500 text-white text-xl rounded p-4 px-10"
    onclick={() => gameSearch()}
  >
    {"Search"}  
  </button>
</div>

<!-- <h1 class="p-4 text-2xl font-bold">{"Popular Games"}</h1> -->

<div class="grid grid-cols-5 gap-4 p-4">
  
  {#if searchLoading}
    <div class="flex justify-center items-center">
		  <SyncLoader size="100" color="#5403fc" unit="px" duration="1s" />
    </div>  
  {:else if filteredGames.length === 0}
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