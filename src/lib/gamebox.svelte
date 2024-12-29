<script lang="ts">
  let input = $props();
  //console.log(input.genres);
</script>

<div class="bg-indigo-700 shadow-md rounded-lg overflow-hidden hover:bg-indigo-600">
  <img src={input.image} alt={input.title} class="w-full h-48 object-cover">
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">{input.title}</h2>
    <p class="text-white">{input.genres.join(', ')}</p>
  </div>
</div>