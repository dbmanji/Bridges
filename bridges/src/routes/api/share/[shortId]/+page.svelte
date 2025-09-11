<script lang="ts">
  import type { PageData } from './$types';
  export let data;
  import pb from '$lib/pocketbase';
</script>

<main class="share-page">
  <h1>File Share</h1>
  <p><strong>File:</strong> {data.file.name}</p>
  
  {#if data.share.embed_preview}
    <div class="preview-section">
      <h2>Preview</h2>
      {#if data.file.type.startsWith('image/')}
        <img 
          src="{pb.baseUrl}/api/files/files/{data.file.id}/{data.file.file}" 
          alt="{data.file.name}" 
          style="max-width: 100%; border-radius: 8px;"
        />
      {:else}
        <p>Preview not available for this file type. Please download.</p>
      {/if}
    </div>
  {/if}
  
  <form method="POST" class="download-form">
    <button type="submit" name="download" class="download-btn">
      Download File
    </button>
  </form>
</main>

<style>
  .share-page {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: #232025;
    color: #efd5c5;
    border-radius: 12px;
    font-family: monospace;
  }
  
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #6fb3c0;
  }
  
  .preview-section {
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid #3b393e;
    border-radius: 8px;
  }
  
  .download-form {
    margin-top: 2rem;
  }
  
  .download-btn {
    padding: 0.8rem 1.5rem;
    background: #6fb3c0;
    color: #232025;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;
  }
  
  .download-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
</style>