<script lang="ts">
  import { pb } from "$lib/pocketbase"; // pocketbase client

  let files: FileList | null = null;
  let title = "";
  let tags = "";
  let visibility: "public" | "unlisted" | "password" = "public";
  let password = "";
  let expires = "forever";
  let downloadLimit: number = 0;
  let viewOnce = false;

  let resultLink = "";

  const expiresOptions = [
    { label: "forever", value: "forever" },
    { label: "in 1 hour", value: "1h" },
    { label: "in 24 hours", value: "24h" },
    { label: "in 7 days", value: "7d" },
    { label: "in 30 days", value: "30d" },
    { label: "in 1 year", value: "1y" },
  ];

  function computeExpiry(value: string): string | null {
    const now = new Date();
    switch (value) {
      case "1h":
        now.setHours(now.getHours() + 1);
        break;
      case "24h":
        now.setDate(now.getDate() + 1);
        break;
      case "7d":
        now.setDate(now.getDate() + 7);
        break;
      case "30d":
        now.setDate(now.getDate() + 30);
        break;
      case "1y":
        now.setFullYear(now.getFullYear() + 1);
        break;
      case "forever":
      default:
        return null;
    }
    return now.toISOString();
  }

  async function createLink() {
    if (!files || !files[0]) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0], files[0].name);
    formData.append("title", title || "test upload");

    // all your other optional fields here...
    if (tags) formData.append("tags", tags);
    if (visibility) formData.append("visibility", visibility);
    if (visibility === "password" && password) formData.append("password", password);

    const expiryDate = computeExpiry(expires);
    if (expiryDate) formData.append("expires", expiryDate);
    if (downloadLimit > 0) formData.append("downloadLimit", downloadLimit.toString());
    formData.append("viewOnce", viewOnce ? "true" : "false");

    try {
      const record = await pb.collection("uploads").create(formData);

      const fileUrl = pb.files.getUrl(record, record.file);

      console.log("Record created:", record);
      console.log("File URL:", fileUrl);

      resultLink = fileUrl; // you can also keep your /d/[id] if you want
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Upload failed: " + (err?.message || JSON.stringify(err)));
    }
  }
</script>

<div class="upload-form">
  <h1>Upload a File</h1>

  <label>
    File:
    <!-- ✅ use on:change to ensure files gets set correctly -->
    <input type="file" on:change={(e) => (files = (e.target as HTMLInputElement).files)} />
  </label>

  <label>
    Title:
    <input type="text" bind:value={title} placeholder="optional label" />
  </label>

  <label>
    Tags:
    <input type="text" bind:value={tags} placeholder="comma, separated" />
  </label>

  <fieldset>
    <legend>Visibility</legend>
    <label><input type="radio" bind:group={visibility} value="public" /> Public</label>
    <label><input type="radio" bind:group={visibility} value="unlisted" /> Unlisted</label>
    <label><input type="radio" bind:group={visibility} value="password" /> Password Protected</label>
  </fieldset>

  {#if visibility === "password"}
    <label>
      Password:
      <input type="password" bind:value={password} />
    </label>
  {/if}

  <label>
    Expires:
    <select bind:value={expires}>
      {#each expiresOptions as opt}
        <option value={opt.value}>{opt.label}</option>
      {/each}
    </select>
  </label>

  <label>
    Download Limit:
    <input type="number" bind:value={downloadLimit} min="0" placeholder="0 = infinite" />
  </label>

  <label>
    <input type="checkbox" bind:checked={viewOnce} /> View once
  </label>

  <button type="button" on:click={createLink}>Create Link</button>

  {#if resultLink}
    <p>Result: {resultLink}</p>
  {/if}
</div>
