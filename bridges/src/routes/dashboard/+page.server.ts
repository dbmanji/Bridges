import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user to login if they're not logged in
  if (!locals.user) {
    throw redirect(303, '/login');
  }

  return {
    user: locals.user
  };
};

export const actions: Actions = {
  logout: async ({ locals }) => {
    locals.pb.authStore.clear();
    locals.user = null;

    throw redirect(303, '/login');
  }
};
