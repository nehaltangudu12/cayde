<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/state';
	import { SyncLoader } from 'svelte-loading-spinners';
	let { children } = $props();
	
</script>


<nav class="space-x-4 bg-gray-800 font-semibold text-lg text-white p-4 flex justify-between">
	<a href="/" class="text-3xl font-semibold tracking-wide">Cayde</a>
	<div class="space-x-4">
		<a href="/" class="hover:bg-gray-700 p-2 rounded">Home</a>
		<a href="/about" class="hover:bg-gray-700 p-2 rounded">About</a>
		<!-- <a href="/login" class="hover:bg-gray-700 p-2 rounded">Login</a> -->
	</div>
</nav>


	{#await navigating.complete}
	<div class="flex justify-center items-center h-screen">
		<SyncLoader size="100" color="#5403fc" unit="px" duration="1s" />
	</div>
	{:then}
		{@render children()}
	{/await}

