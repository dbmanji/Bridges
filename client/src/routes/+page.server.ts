import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// if user is logged in we redirect them to dashboard, or else we ask them to login
export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/dashboard');
	}

	throw redirect(303, '/login');
};
