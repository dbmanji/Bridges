<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	let file: File | null = null;

	async function uploadFile() {
		if (!file) {
			alert('Please select a file first!');
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			if (!res.ok) throw new Error(await res.text());
			alert('File uploaded successfully ✅');
		} catch (err) {
			alert('Upload failed ❌ ' + err);
		}
	}
</script>

<main>
	<header class="page-header">
		<div>
			<h1>bridges / dashboard</h1>
			<p class="subtitle">welcome, <strong>@{data.user?.username ?? 'guest'}</strong> – minimal overview + quick actions</p>
		</div>

		<form method="POST" action="?/logout" use:enhance class="logout-form">
			<button type="submit" class="logout">Logout</button>
		</form>
	</header>

	<!-- search -->
	<section class="section-box">
		<h2 class="section-title">search</h2>
		<div class="section-content">
			<div class="row">
				<div>
					<label>query</label>
					<input type="text" placeholder="find by name or tag" />
				</div>
				<div>
					<label>scope</label>
					<input type="text" placeholder="all" />
				</div>
				<div>
					<label>sort</label>
					<input type="text" placeholder="recent" />
				</div>
				<button>search</button>
			</div>
			<p class="tip">tip: tags like <span class="tag">work</span> <span class="tag">audio</span> <span class="tag">private</span></p>
		</div>
	</section>

	<!-- quick -->
<section class="section-box">
	<h2 class="section-title">quick</h2>
	<div class="section-content">
		<!-- Dropzone -->
		<div class="dropzone">
			<!-- hidden file input -->
			<input 
				type="file" 
				id="fileUpload" 
				class="hidden-input"
				on:change={(e) => file = e.target.files?.[0] ?? null}
			/>
			<!-- Custom buttons inside dropzone -->
			<label for="fileUpload" class="custom-file-btn">
				select file
			</label>
			
{#if file}
  <p class="muted">📂 Selected: {file.name} ({Math.round(file.size / 1024)} KB)</p>
{/if}
			<button on:click={uploadFile}>upload file</button>
			<a href="/upload">
			<button on:click={() => (showConfigure = true)}>configure file</button>
			</a>
		</div>

		<!-- Quick actions -->
		<div class="quick-actions">
			<button>new link</button>
			<button>your files</button>
			<button>your links</button>
		</div>

		<p class="muted">drag & drop may be supported if enabled</p>
	</div>
</section>

	<!-- overview -->
	<section class="section-box">
		<h2 class="section-title">overview</h2>
		<div class="section-content">
			<table>
				<tbody>
					<tr>
						<td>storage used</td>
						<td>3.1 GB</td>
						<td>files</td>
						<td>74</td>
					</tr>
					<tr>
						<td>links active</td>
						<td>26</td>
						<td>expiring soon</td>
						<td>3</td>
					</tr>
					<tr>
						<td>views (30d)</td>
						<td>1,204</td>
						<td>downloads (30d)</td>
						<td>318</td>
					</tr>
					<tr>
						<td>last login</td>
						<td>2025-09-04 10:22</td>
						<td>account status</td>
						<td>OK</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</main>

<style>
	:global(:root) {
		--bg: #232025;
		--fg: #efd5c5;
		--muted: #8f8886;
		--line: #3b393e;
		--accent: #6fb3c0;
	}
	:global(body) {
		margin: 0;
		background: var(--bg);
		color: var(--fg);
		font: 15px/1.5 monospace;
	}

	main {
		max-width: 900px;
		margin: 5vh auto 0;
		padding: 0 1rem 5rem;
	}

	/* header with logout on the right */
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	h1 {
		font-size: 1.1rem;
		margin: 0 0 0.25rem 0;
	}
	.subtitle {
		margin: 0;
		color: var(--muted);
		font-size: 0.9rem;
	}
	strong {
		color: var(--accent);
	}

	.logout-form {
		margin-left: auto;
	}
	.logout {
		padding: 0.45rem 0.85rem;
		border: 1px solid var(--accent);
		background: transparent;
		color: var(--fg);
		cursor: pointer;
		border-radius: 4px;
	}
	.logout:hover {
		background: var(--accent);
		color: var(--bg);
	}

	/* form controls & sections */
	.row {
		display: grid;
		grid-template-columns: repeat(4, 1fr) auto;
		gap: 0.6rem;
		align-items: end;
	}
	label {
		display: block;
		font-size: 0.7rem;
		color: var(--muted);
		margin-bottom: 0.3rem;
	}
	input {
		background: transparent;
		border: 1px solid var(--line);
		color: var(--fg);
		padding: 0.4rem;
		width: 100%;
	}
	button {
		padding: 0.4rem 0.7rem;
		border: 1px solid var(--accent);
		background: transparent;
		color: var(--fg);
		cursor: pointer;
	}
	button:hover {
		background: var(--accent);
		color: var(--bg);
	}
	.tip {
		font-size: 0.75rem;
		margin-top: 0.6rem;
		color: var(--muted);
	}
	.tag {
		display: inline-block;
		padding: 0.1rem 0.4rem;
		border: 1px solid var(--line);
		margin-left: 0.3rem;
		color: var(--fg);
	}
	.actions {
		display: flex;
		gap: 0.6rem;
		margin-bottom: 0.6rem;
	}
	.muted {
		color: var(--muted);
		font-size: 0.75rem;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.85rem;
	}
	td {
		padding: 0.4rem 0.6rem;
		border: 1px solid var(--line);
	}

	/* section title-on-border layout */
	.section-box {
		margin: 2rem 0;
		position: relative;
	}
	.section-title {
		font-size: 1rem;
		text-transform: uppercase;
		color: var(--muted);
		margin: 0;
		padding: 0 0.5rem;
		position: relative;
		top: 0.7rem; /* pushes title down onto the border */
		background: var(--bg);
		display: inline-block;
	}
	.section-content {
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 1.2rem;     /* more breathing room inside */
		margin-top: 0.8rem;  /* space between title and content */
	}
	.hidden-input {
    	display: none;
  	}

  	.custom-file-btn {
  		padding: 0.4rem 0.7rem;
  		border: 1px solid var(--accent);
  		background: transparent;
  		color: var(--fg);
  		cursor: pointer;
  		display: inline-block;
  		text-align: center;
	}

	.custom-file-btn:hover {
  		background: var(--accent);
  		color: var(--bg);
	}
	.dropzone {
	border: 2px dashed var(--accent);
	border-radius: 6px;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.8rem;
	margin-bottom: 1rem;
	}
	.quick-actions {
		display: flex;
		gap: 0.6rem;
		margin-top: 0.8rem;
	}
	.quick-actions button {
		flex: 1; /* equal width */
		text-align: center;
	}

</style>
