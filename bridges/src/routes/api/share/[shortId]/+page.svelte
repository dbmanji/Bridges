<!-- src/routes/share/[shortId]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<main>
  <h1>File Share</h1>
  <p>File: {data.file.name}</p>
  
  {#if data.share.embed_preview}
    <div>
      <h2>Preview</h2>
      {#if data.file.type.startsWith('image/')}
        <img src="{pb.baseUrl}/api/files/files/{data.file.id}/{data.file.file}" alt="{data.file.name}" style="max-width: 100%;" />
      {:else}
        <p>Preview not available for this file type. Please download.</p>
      {/if}
    </div>
  {/if}
  
  <form method="POST">
    <button type="submit" name="download">Download File</button>
  </form>
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
</style>