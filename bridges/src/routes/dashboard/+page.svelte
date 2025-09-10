<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>bridges / dashboard</h1>
	<p>welcome, <strong>@{data.user?.username ?? 'guest'}</strong> – minimal overview + quick actions</p>

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
		<div class="actions">
			<button>upload file</button>
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
        <td>users</td>
        <td>12</td>
        <td>links</td>
        <td>45</td>
      </tr>
      <tr>
        <td>uploads today</td>
        <td>8</td>
        <td>downloads</td>
        <td>220</td>
      </tr>
      <tr>
        <td>active sessions</td>
        <td>5</td>
        <td>errors</td>
        <td>0</td>
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
	h1 {
		font-size: 1.1rem;
		margin-bottom: 0.3rem;
	}
	h2 {
		font-size: 0.9rem;
		font-weight: normal;
		color: var(--muted);
		margin-bottom: 0.5rem;
	}
	strong {
		color: var(--accent);
	}
	.box {
		border: 1px solid var(--line);
		padding: 1rem;
		margin: 1.5rem 0;
	}
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
  padding: 1.2rem;
  margin-top: 0.8rem; /* pulls box up to meet title */
}

</style>
