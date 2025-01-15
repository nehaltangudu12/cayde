<script>
  let username = '';
  let password = '';

  const handleSubmit = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };
</script>

<div class="max-w-md mx-auto mt-10 p-4 border-4 border-indigo-600 rounded-md">
  <h2 class="text-2xl mb-4">Login</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-4">
      <label for="username" class="block mb-2">Username</label>
      <input type="text" id="username" bind:value={username} required class="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <div class="mb-4">
      <label for="password" class="block mb-2">Password</label>
      <input type="password" id="password" bind:value={password} required class="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Login</button>
  </form>
</div>
