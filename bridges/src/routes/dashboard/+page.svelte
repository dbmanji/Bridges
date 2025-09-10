// THIS IS PLACEHOLDER FOR DASHBOARD.. I WILL DO PROPER LATER -hakimi
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>Dashboard</h1>

	{#if data.user}
		<p>Welcome, <strong>{data.user.username}</strong>! You have successfully registered and logged in.</p>
	{:else}
		<p>Welcome! You have successfully registered and logged in.</p>
	{/if}

	<form method="POST" action="?/logout" use:enhance>
		<button type="submit">Logout</button>
	</form>
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
		max-width: 600px;
		margin: 10vh auto 0;
		padding: 0 1rem;
	}
	h1 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
    strong {
        color: var(--accent);
    }
	button {
		margin-top: 1.5rem;
		padding: 0.5rem 0.8rem;
		border: 1px solid var(--accent);
		background: transparent;
		color: var(--fg);
		cursor: pointer;
	}
	button:focus {
		outline: 1px solid var(--accent);
		outline-offset: 0;
	}
</style>
