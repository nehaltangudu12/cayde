<script lang="ts">
  import Gamebox from '$lib/gamebox.svelte';
  import secrets from '$lib/secrets.json';

  let { data } = $props()
  
  console.log(data)

  const games = data.games;
  const genrelist = data.genres;
  console.log(genrelist);
  // console.log(games[0].genres.map((x: number) => genres.find((y: any) => y.id === x).name));
</script>

<h1 class="text-2xl font-bold underline">{"hi"}</h1>

<div class="grid grid-cols-5 gap-4 p-4">
  {#each games as game,i}
    <!-- <p>{game.name}, {game.genres}</p> -->
    <Gamebox 
      title={game.name} 
      genres={game.genres ? game.genres.map((x: number) => genrelist.find((y: any) => y.id === x).name) : []}
    />
  {/each}
</div>