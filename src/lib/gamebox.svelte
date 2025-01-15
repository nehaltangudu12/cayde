<script lang="ts">
  let input = $props();
</script>

<a href="/game/{input.id}" class="bg-indigo-700 shadow-md rounded-lg overflow-hidden hover:bg-indigo-600">
  <img src={input.cover} alt={input.title} class="w-full h-3/4 object-cover">
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">{input.title}</h2>
    <p class="text-white">{input.genres.join(', ')}</p>
  </div>
</a>