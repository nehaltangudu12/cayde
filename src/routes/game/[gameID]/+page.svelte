<script lang="ts">
    import type { PageData } from './$types';
    import secrets from '../../../../secrets.json';
    import { createClient } from '@supabase/supabase-js';

    let { data }: { data: PageData } = $props();
    const game = data.game;
    const genrelist = data.genres;
    const platformlist = data.platforms;
    const guides = data.guides;
    const websites = data.websites;
    
    const myGenres = game.genres ? game.genres.map((x: number) => genrelist.find((y: any) => y.id === x).name) : ["N/A"];
    const myPlatforms = game.platforms ? game.platforms.map((x: number) => platformlist.find((y: any) => y.id === x).name) : ["N/A"];
    
    const cover = data.cover.url.replace("t_thumb","t_cover_big");

    let submitURL : string = $state("");
    let title : string = $state("");

    const steamObj = websites.find((site: any) => site.url.includes("store.steampowered"))
    const steamID = steamObj ? steamObj.url.split("/").find((p: string) => p != '' && !isNaN(Number(p))) : "";
    console.log(steamID)
    

    async function handleSubmit() {
      const supabase = createClient(secrets.supabaseUrl, secrets.supabaseKey);
      const { data: guide, error } = await supabase
        .from('Guides')
        .insert({game: game.id, url: submitURL, title: title})
      if (error) {
        console.log(error);
      }
    }

    function removeAccents(str: string) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function removeSpecials(str: string) {
      return str.replace(/[^a-zA-Z0-9 ]/g, '');
    }

    const ignformat = removeSpecials(removeAccents(game.name)).toLowerCase().replaceAll(" ", "-")

</script>


<div class="m-8 p-4 bg-indigo-800 rounded flex">
  <div class="flex-none basis-2/6">
    <img src="{cover}" alt="{game.name}" class="object-cover rounded-lg shadow-2xl">
    <h1 class="text-3xl font-semibold text-white my-4">{game.name}</h1>
    <p class="text-white">{myGenres.join(', ')}</p>
  </div>
  <div class="flex-none basis-4/6">
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Platforms</h2>
      <p class="text-lg">
        {myPlatforms.join(', ')}
      </p>
    </section>
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Summary</h2>
      <p class="text-lg">
        {game.summary}
      </p>
    </section>

    <section class="mb-8">
      <details class="bg-gray-800 rounded p-4 my-4">
      <summary class="text-2xl font-semibold cursor-pointer">Store Pages</summary>
      <div class="mt-4">
        {#each websites as website}
          {#if website.url.includes("steam") || website.url.includes("epic") || website.url.includes("gog") 
            || website.url.includes("www." + removeAccents(game.name).toLowerCase()) }
            <a class="text-xl bg-gray-800 rounded p-4 my-4 hover:bg-blue-800 flex flex-row" href={website.url}>
              <span>
                <img class="max-h-8 my-auto mr-4" src={"https://" + website.url.split('/')[2] + "/favicon.ico"} alt="https://gamefaqs.gamespot.com/favicon.ico">
              </span> 
              {website.url}
            </a>
          {/if}
      {/each}
      </div>
      </details>
    </section>

    <section class="mb-8">
      <details class="bg-gray-800 rounded p-4 my-4">
      <summary class="text-2xl font-semibold cursor-pointer">Wikis</summary>
      <div class="mt-4">
        {#each websites as website}
        {#if website.url.includes("fandom") || website.url.includes("wikia") || website.url.includes("wikipedia")}
          <a class="text-xl bg-gray-800 rounded p-4 my-4 hover:bg-blue-800 flex flex-row" href={website.url}>
              <span>
                <img class="max-h-8 my-auto mr-4" src={"https://" + website.url.split('/')[2] + "/favicon.ico"} alt="https://gamefaqs.gamespot.com/favicon.ico">
              </span>
              {website.url}
          </a>
        {/if}
        {/each}
      </div>
      </details>
    </section>

    <section class="mb-8">
      <details class="bg-gray-800 rounded p-4 my-4">
      <summary class="text-2xl font-semibold cursor-pointer">Socials</summary>
      <div class="mt-4">
        {#each websites as website}
          {#if website.url.includes("Discord") || website.url.includes("twitter") || website.url.includes("instagram")}
            <a class="text-xl bg-gray-800 rounded p-4 my-4 hover:bg-blue-800 flex flex-row" href={website.url}>
              <span>
                <img class="max-h-8 my-auto mr-4" src={"https://" + website.url.split('/')[2] + "/favicon.ico"} alt="">
              </span>
              {website.url}
          </a>
          {/if}
      {/each}
      </div>
      </details>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold cursor-pointer">Popular Guide Pages</h2>
      <div class="mt-4">
            <a class="text-xl bg-gray-800 rounded p-4 my-4 hover:bg-blue-800 flex flex-row" href="https://steamcommunity.com/app/{steamID}/guides/">
              <span>
                <img class="max-h-8 my-auto mr-4" src="https://steamcommunity.com/favicon.ico" alt="">
              </span>
              <b>Steam Guides</b>
            </a>
            <a class="text-xl bg-gray-800 rounded p-4 my-4 hover:bg-blue-800 flex flex-row" href="https://www.ign.com/wikis/{ignformat}">
              <span>
                <img class="max-h-8 my-auto mr-4" src="https://www.ign.com/favicon.ico" alt="">
              </span>
              <b>IGN Guides</b>
            </a>
            <a class="text-xl bg-gray-800 rounded p-4 my-4 hover:bg-blue-800 flex flex-row" href="http://www.google.com/search?q=site:https://gamefaqs.gamespot.com+{game.name}">
              <span>
                <img class="max-h-8 my-auto mr-4" src="https://gamefaqs.gamespot.com/favicon.ico" alt="">
              </span>
              <b>GameFAQs</b>
            </a>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Top Guides</h2>
      <div>
        {#if guides}
          {#each guides as guide}
          <div class="bg-gray-800 p-4 gap-4 rounded mx-8 hover:scale-105 transition-all flex flex-row"><a href="/" class="flex flex-row gap-4" >
            <img class="max-h-8 my-auto" src={"https://" + guide.url.split('/')[2] + "/favicon.ico"} alt="https://gamefaqs.gamespot.com/favicon.ico">
            <div>
              <span class="text-xl">{guide.title}</span>
              <p>{guide.url}</p>
            </div>
            <div class="flex-auto"></div>          
            </a> 
            <div class="flex-auto"></div>
            <p class="my-auto text-xl text">{guide.stars}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="max-h-10 my-auto place-self-end hover:fill-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </div>
          {/each}
        {/if}
        
      </div>
      <form  class="bg-gray-800 p-4 rounded mt-4" onsubmit={handleSubmit}>
        <h2 class="text-2xl font-semibold mb-4">Submit a Guide</h2>
        <div class="mb-4">
          <label for="title" class="block mb-2">Guide Title</label>
          <input type="text" id="title" bind:value={title} required class="w-full text-black p-2 border border-gray-300 rounded-md" />
        </div>
        <div class="mb-4">
          <label for="url" class="block mb-2">Guide URL</label>
          <input type="url" id="url" bind:value={submitURL} required class="w-full text-black p-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Submit Guide</button>
      </form>
    </section>

  </div>
</div>