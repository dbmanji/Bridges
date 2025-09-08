<script lang="ts">
	import { enhance } from '$app/forms';
	import { navigating } from '$app/state';

	export let form:
		| {
				message?: string;
				success?: boolean;
				errors?: { username?: string; password?: string };
		  }
		| undefined;

	let showPassword = false;
	let passwordFieldType: 'password' | 'text' = 'password';

	function togglePassword() {
		showPassword = !showPassword;
		passwordFieldType = showPassword ? 'text' : 'password';
	}
</script>

<main>
	<header>
		<h1>Bridges</h1>
		<div class="muted">privacy-first file links</div>
	</header>

	<form method="POST" action="?/login" autocomplete="on" use:enhance>
		<fieldset>
			<legend>sign in</legend>

			<label for="u">username</label>
			<input
				id="u"
				name="username"
				required
				pattern="^[a-zA-Z0-9_.-]{3,32}$"
				autocomplete="username"
				aria-invalid={form?.errors?.username ? 'true' : 'false'}
				aria-describedby={form?.errors?.username ? 'u-err' : undefined}
			/>

			{#if form?.errors?.username}
				<div id="u-err" class="err">{form.errors.username}</div>
			{/if}

			<label for="p">password</label>
			<div class="password-wrapper">
				<input
					id="p"
					name="password"
					type={passwordFieldType}
					required
					autocomplete="current-password"
					aria-invalid={form?.errors?.password ? 'true' : 'false'}
					aria-describedby={form?.errors?.password ? 'p-err' : undefined}
				/>
				<button type="button" on:click={togglePassword} class="toggle-vis" tabindex="-1">
					{showPassword ? 'hide' : 'show'}
				</button>
			</div>

			{#if form?.errors?.password}
				<div id="p-err" class="err">{form.errors.password}</div>
			{/if}

			<div class="row">
				<label class="muted">
					<input type="checkbox" name="remember" />
					remember
				</label>
				<button type="submit" disabled={!!navigating}>
    				{navigating ? 'signing in...' : 'enter'}
				</button>
			</div>

			{#if form?.message}
				<div class="msg" role="status" aria-live="polite">{form.message}</div>
			{/if}
		</fieldset>
	</form>

	<hr />
	<div><small>no email required. metadata stripped from uploads. no tracking.</small></div>
	<div class="muted" style="margin-top:.5rem">no account? <a href="/register">register</a></div>
</main>

<style>
	/* maybe this will fix the input box overflowing? idk lol just test/bandaid */
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	:global(:root) {
		--bg: #232025;
		--fg: #efd5c5;
		--muted: #8f8886;
		--line: #3b393e;
		--accent: #6fb3c0;
	}
	:global(html, body) {
		height: 100%;
	}
	:global(body) {
		margin: 0;
		background: var(--bg);
		color: var(--fg);
		font: 15px/1.5 monospace;
	}

	main {
		max-width: 420px;
		margin: 10vh auto 0;
		padding: 0 1rem;
	}
	h1 {
		font-size: 1rem;
		margin: 0 0 0.25rem 0;
	}
	.muted {
		color: var(--muted);
	}
	fieldset {
		border: 1px solid var(--line);
		padding: 0.9rem;
	}
	legend {
		padding: 0 0.35rem;
		color: var(--muted);
		font-size: 0.85rem;
	}
	label {
		display: block;
		margin: 0.5rem 0 0.25rem;
	}
	input[type='text'],
	input[type='password'],
	input:not([type]) {
		width: 100%;
		padding: 0.5rem 0.6rem;
		border: 1px solid var(--line);
		background: #2b292d;
		color: var(--fg);
	}
	input:focus {
		outline: none;
		border-color: var(--accent);
	}
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.5rem;
		gap: 0.75rem;
	}
	button {
		padding: 0.5rem 0.8rem;
		border: 1px solid var(--accent);
		background: transparent;
		color: var(--fg);
		cursor: pointer;
	}
	button:disabled {
		border-color: var(--muted);
		color: var(--muted);
		cursor: not-allowed;
	}
	button:focus {
		outline: 1px solid var(--accent);
		outline-offset: 0;
	}
	a {
		color: var(--accent);
		text-decoration: underline;
	}
	hr {
		border: 0;
		border-top: 1px solid var(--line);
		margin: 1rem 0;
	}
	small {
		color: var(--muted);
	}

	.msg {
		margin-top: 0.75rem;
		font-size: 0.9rem;
		color: var(--fg);
	}
	.err {
		margin-top: 0.25rem;
		font-size: 0.85rem;
		color: #ffb4a2;
	}

	.password-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.password-wrapper input {
		padding-right: 4rem;
	}

	.toggle-vis {
		position: absolute;
		right: 1px;
		height: calc(100% - 2px);
		border: none;
		background: var(--bg);
		color: var(--muted);
		padding: 0 0.75rem;
		cursor: pointer;
		font-size: 0.8rem;
	}
</style>