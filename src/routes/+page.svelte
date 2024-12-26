<script>
  import Gamebox from '$lib/gamebox.svelte';

  let title = "Welcome to SvelteKit";
</script>

<h1 class="text-2xl font-bold underline">{title}</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
 
<div class="grid grid-cols-5 gap-4 p-4">
  <Gamebox title="Halo Infinite" genres={['Shooter', 'Action']}/>
  
</div>