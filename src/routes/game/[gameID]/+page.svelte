<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    const game = data.game;
    const genrelist = data.genres;
    
    const myGenres = game.genres ? game.genres.map((x: number) => genrelist.find((y: any) => y.id === x).name) : []
    
</script>


<h1>{game.name}</h1>

<div class="m-8 p-4 bg-indigo-800 rounded flex">
  <div class="flex-none basis-2/6">
    <img src="" alt="{game.name}" class="w-full h-48 object-cover rounded-lg">
    <h1 class="text-3xl font-semibold text-white">{game.name}</h1>
    <p class="text-white">{myGenres.join(', ')}</p>
  </div>
  <div class="flex-none basis-4/6">
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Platforms</h2>
      <p class="text-lg">
        Windows, Xbox One, Xbox Series X/S
      </p>
    </section>
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Summary</h2>
      <p class="text-lg">
        {game.summary}
      </p>
    </section>
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Guides</h2>
      <p class="text-lg">
        Halo Infinite is a first-person shooter game developed by 343 Industries and published by Xbox Game Studios. 
        It is the sixth main entry in the Halo series and the fourteenth overall. The game was released on December 8, 2021, 
        for Windows, Xbox One, and Xbox Series X/S.
      </p>
    </section>

  </div>
</div>