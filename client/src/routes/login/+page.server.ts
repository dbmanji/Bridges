import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { ClientResponseError } from 'pocketbase';

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		try {
			await locals.pb.collection('users').authWithPassword(data.username as string, data.password as string);

		} catch (err) {
			if (err instanceof ClientResponseError) {
				console.error('PocketBase Auth Error:', err);
				return fail(err.status, {
					message: 'Invalid username or password. Please try again.'
				});
			}
			console.error('Generic Error:', err);
			return fail(500, {
				message: 'Something went wrong on our end. Please try again later.'
			});
		}
		throw redirect(303, '/dashboard');
	}
};