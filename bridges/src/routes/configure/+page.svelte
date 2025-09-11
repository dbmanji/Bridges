<script lang="ts">
  export let fileId: string;

  let expires: string = "24h";
  let visibility: string = "public";
  let password: string = "";
  let downloadLimitEnabled = false;
  let downloadLimit: number = 10;
  let viewOnce = false;
  let embedPreview = false;

  async function saveConfig() {
    console.log("Saving config for file:", fileId, {
      expires,
      visibility,
      password: visibility === "password" ? password : null,
      downloadLimit: downloadLimitEnabled ? downloadLimit : null,
      viewOnce,
      embedPreview
    });

    // TODO: call your backend API to save config & generate link
  }
</script>

<main class="max-w-xl mx-auto p-6 space-y-6">
  <h1 class="text-2xl font-bold">Configure File</h1>

  {#if fileId}
    <p class="text-gray-400 mb-4">
      Configuring file with ID: <span class="font-mono">{fileId}</span>
    </p>

    <form
      on:submit|preventDefault={saveConfig}
      class="space-y-6 bg-gray-800 p-6 rounded-xl shadow-lg"
    >
      <!-- Expiration -->
      <div>
        <label class="block mb-1 font-medium">Expiration</label>
        <select
          bind:value={expires}
          class="w-full p-2 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="1h">1 hour</option>
          <option value="24h">24 hours</option>
          <option value="7d">7 days</option>
          <option value="30d">30 days</option>
          <option value="never">Never expire</option>
        </select>
      </div>

      <!-- Visibility -->
      <div>
        <label class="block mb-1 font-medium">Visibility</label>
        <select
          bind:value={visibility}
          class="w-full p-2 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="password">Password Protected</option>
        </select>
      </div>

      {#if visibility === "password"}
        <!-- Password -->
        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            type="password"
            bind:value={password}
            class="w-full p-2 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>
      {/if}

      <!-- Download Limit -->
      <div>
        <label class="flex items-center space-x-2">
          <input type="checkbox" bind:checked={downloadLimitEnabled} />
          <span class="font-medium">Limit downloads</span>
        </label>
        {#if downloadLimitEnabled}
          <input
            type="number"
            bind:value={downloadLimit}
            min="1"
            class="mt-2 w-full p-2 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter max downloads"
          />
        {/if}
      </div>

      <!-- View Once -->
      <div class="flex items-center space-x-2">
        <input type="checkbox" bind:checked={viewOnce} />
        <span class="font-medium">View once only</span>
      </div>

      <!-- Embed Preview -->
      <div class="flex items-center space-x-2">
        <input type="checkbox" bind:checked={embedPreview} />
        <span class="font-medium">Enable embed preview</span>
      </div>

      <!-- Save Button -->
      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg transition"
      >
        Save & Generate Link
      </button>
    </form>
  {:else}
    <p class="text-red-400">No file selected. Please upload a file first.</p>
  {/if}
</main>
