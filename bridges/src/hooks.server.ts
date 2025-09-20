import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { PB_URL } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
    const pb = new PocketBase(PB_URL);

    pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        if (pb.authStore.isValid) {
            await pb.collection('users').authRefresh();
            const user = structuredClone(pb.authStore.model);

            // Block login if not verified or disabled
            if (!user.isVerified || user.disabled) {
                pb.authStore.clear();
                event.locals.user = null;
            } else {
                event.locals.user = user;
            }
        } else {
            event.locals.user = null;
        }
    } catch (_) {
        pb.authStore.clear();
        event.locals.user = null;
    }

    event.locals.pb = pb;

    const response = await resolve(event);

    response.headers.append('set-cookie', pb.authStore.exportToCookie({ secure: false }));
    return response;
};
