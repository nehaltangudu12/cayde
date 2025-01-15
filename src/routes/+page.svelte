<script lang="ts">
  import Gamebox from '$lib/gamebox.svelte';
  import secrets from '$lib/secrets.json';

  let { data } = $props()
  
  const games = data.games;
  const genrelist = data.genres;
  const coverlist = data.covers;


</script>

<h1 class="p-4 text-2xl font-bold">{"Popular Games"}</h1>

<div class="grid grid-cols-5 gap-4 p-4">
  {#each games as game,i}
    <!-- <p>{game.name}, {game.genres}</p> -->
    <Gamebox 
      title={game.name} 
      genres={game.genres ? game.genres.map((x: number) => genrelist.find((y: any) => y.id === x).name) : []}
      id={game.id}
      cover={game.cover ? coverlist.find((y: any) => y.id === game.cover).url.replace("t_thumb","t_cover_big") : ""}
    />
  {/each}
</div>