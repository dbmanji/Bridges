import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
    if (locals.user) {
        throw redirect(303, '/dashboard');
    } else {
        throw redirect(303, '/login');
    }
};