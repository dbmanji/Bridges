<script lang="ts">
	import { enhance } from '$app/forms';

	let expires: string = '24h'; // default
	let visibility: string = 'public';
	let password: string = '';
	let downloadLimitEnabled: boolean = false;
	let downloadLimit: number = 10;
	let viewOnce: boolean = false;
	let embedPreview: boolean = false;

	function handleSubmit() {
		// You can handle form submission here, e.g., send config to API
		console.log({
			expires,
			visibility,
			password: visibility === 'password' ? password : null,
			downloadLimit: downloadLimitEnabled ? downloadLimit : null,
			viewOnce,
			embedPreview
		});
		alert('Configuration saved ✅');
	}
</script>

<main>
	<header class="page-header">
		<div>
			<h1>bridges / configure file</h1>
			<p class="subtitle">customize sharing settings for your upload</p>
		</div>
		<a href="/dashboard">
			<button class="logout">← Back</button>
		</a>
	</header>

	<section class="section-box">
		<h2 class="section-title">expiration</h2>
		<div class="section-content">
			<div class="select-wrapper">
				<select
					name="expires"
					bind:value={expires}
					class="custom-select"
				>
					{#each [
						{ value: '1h', label: '1 hour' },
						{ value: '24h', label: '24 hours' },
						{ value: '7d', label: '7 days' },
						{ value: '30d', label: '30 days' },
						{ value: '1y', label: '1 year' },
						{ value: 'never', label: 'Never expire' }
					] as option}
						<option value={option.value}>
							{option.label}
						</option>
					{/each}
				</select>
			</div>
		</div>
	</section>

	<section class="section-box">
		<h2 class="section-title">visibility</h2>
		<div class="section-content">
			<div class="select-wrapper">
				<select
					name="visibility"
					bind:value={visibility}
					class="custom-select"
				>
					{#each [
						{ value: 'public', label: 'Public – anyone with link' },
						{ value: 'unlisted', label: 'Unlisted – not searchable' },
						{ value: 'password', label: 'Password protected' }
					] as option}
						<option value={option.value}>
							{option.label}
						</option>
					{/each}
				</select>
			</div>

			{#if visibility === 'password'}
				<div class="input-group" style="margin-top: 1rem;">
					<label>Set password</label>
					<input
						type="text"
						bind:value={password}
						placeholder="Enter password"
						style="width: 100%;"
					/>
				</div>
			{/if}
		</div>
	</section>

	<section class="section-box">
		<h2 class="section-title">limits & behavior</h2>
		<div class="section-content">
			<div class="toggle-row">
				<label class="toggle-label-large">
					<span>Download limit</span>
				</label>
				<div class="toggle-controls">
					<input
						type="checkbox"
						bind:checked={downloadLimitEnabled}
						class="toggle-checkbox"
					/>
					{#if downloadLimitEnabled}
						<input
							type="number"
							min="1"
							bind:value={downloadLimit}
							class="download-limit-input"
						/>
					{/if}
				</div>
			</div>

			<div class="toggle-row">
				<label class="toggle-label-large">
					<span>View once (auto-delete after first view)</span>
				</label>
				<div class="toggle-controls">
					<input
						type="checkbox"
						bind:checked={viewOnce}
						class="toggle-checkbox"
					/>
				</div>
			</div>

			<div class="toggle-row">
				<label class="toggle-label-large">
					<span>Embed preview (opens in page, no direct download)</span>
				</label>
				<div class="toggle-controls">
					<input
						type="checkbox"
						bind:checked={embedPreview}
						class="toggle-checkbox"
					/>
				</div>
			</div>
		</div>
	</section>

	<div style="text-align: center; margin-top: 2rem;">
		<button on:click={handleSubmit} class="save-button">
			Save Configuration & Generate Link
		</button>
	</div>
</main>

<style>
	:global(:root) {
		--bg: #232025;
		--fg: #efd5c5;
		--muted: #8f8886;
		--line: #3b393e;
		--accent: #6fb3c0;
		--dropdown-bg: #333036;
		--dropdown-fg: #f5e5d5;
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

	.logout {
		padding: 0.45rem 0.85rem;
		border: 1px solid var(--accent);
		background: transparent;
		color: var(--fg);
		cursor: pointer;
		border-radius: 4px;
		text-decoration: none;
		display: inline-block;
	}
	.logout:hover {
		background: var(--accent);
		color: var(--bg);
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
		top: 0.7rem;
		background: var(--bg);
		display: inline-block;
	}
	.section-content {
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 1.2rem;
		margin-top: 0.8rem;
	}

	/* Dropdown Styling */
	.select-wrapper {
		position: relative;
		width: 100%;
	}
	.custom-select {
		appearance: none;
		background: var(--dropdown-bg);
		border: 1px solid var(--line);
		color: var(--dropdown-fg);
		padding: 0.6rem 1rem;
		width: 100%;
		border-radius: 4px;
		cursor: pointer;
		font: inherit;
	}
	.custom-select:hover {
		background: #444147;
	}
	.custom-select option {
		background: var(--dropdown-bg);
		color: var(--dropdown-fg);
	}
	.select-wrapper::after {
		content: '▼';
		font-size: 0.7rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: var(--muted);
	}

	/* Improved Toggle rows styling */
	.toggle-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 0;
		border-bottom: 1px solid var(--line);
	}
	.toggle-row:last-child {
		border-bottom: none;
	}

	.toggle-label-large {
		flex: 1;
		font-size: 1rem;
		color: var(--fg);
		cursor: pointer;
		padding: 0.5rem 0;
	}

	.toggle-controls {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.toggle-checkbox {
		width: 24px;
		height: 24px;
		cursor: pointer;
		appearance: none;
		background: var(--line);
		border: 2px solid var(--accent);
		border-radius: 6px;
		position: relative;
		transition: all 0.2s ease;
	}

	.toggle-checkbox:checked {
		background: var(--accent);
		border-color: var(--accent);
	}

	.toggle-checkbox:checked::after {
		content: '✓';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: var(--bg);
		font-size: 14px;
		font-weight: bold;
	}

	.download-limit-input {
		background: transparent;
		border: 1px solid var(--line);
		color: var(--fg);
		padding: 0.5rem;
		width: 80px;
		text-align: center;
		border-radius: 4px;
		font-size: 1rem;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		margin-top: 1rem;
	}
	.input-group label {
		font-size: 0.7rem;
		color: var(--muted);
	}
	input[type="text"] {
		background: transparent;
		border: 1px solid var(--line);
		color: var(--fg);
		padding: 0.6rem;
		width: 100%;
		border-radius: 4px;
		font-size: 1rem;
	}

	.save-button {
		padding: 0.8rem 2.5rem;
		font-size: 1.2rem;
		border: 2px solid var(--accent);
		background: transparent;
		color: var(--fg);
		cursor: pointer;
		border-radius: 6px;
		font-weight: bold;
		transition: all 0.2s ease;
	}
	.save-button:hover {
		background: var(--accent);
		color: var(--bg);
		transform: translateY(-2px);
	}
</style>