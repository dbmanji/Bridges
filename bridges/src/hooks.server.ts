import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PB_URL } from '$env/static/private'; // PB_URL="http://127.0.0.1:8090" (we will not change the default), also this is in bridges/.env

export const handle: Handle = async ({ event, resolve }) => {
	const pb = new PocketBase(PB_URL);
	event.locals.pb = pb;

	pb.authStore.loadFromCookie(event.request.headers.get('cookie') ?? '');

	// try to refresh; clear if invalid/expired
	try {
		if (pb.authStore.isValid) {
			await pb.collection('users').authRefresh();
		}
	} catch {
		pb.authStore.clear();
	}

	// expose current user on locals
	event.locals.user = pb.authStore.model ?? null;

	const response = await resolve(event);

	const cookie = pb.authStore.exportToCookie({
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax',
		path: '/'
	});
	response.headers.append('set-cookie', cookie);

	return response;
};
