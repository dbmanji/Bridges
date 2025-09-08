import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import PocketBase, { ClientResponseError } from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export const actions: Actions = {
  register: async (event) => {
    const fd = await event.request.formData();
    const username = (fd.get('username') ?? '').toString().trim();
    const password = (fd.get('password') ?? '').toString();
    const confirm  = (fd.get('confirm')  ?? '').toString();
	
    const usernameRegex = /^[a-zA-Z0-9_.-]{3,32}$/;
    if (!usernameRegex.test(username)) {
      return fail(400, {
        success: false,
        message: 'Registration failed. Please fix the errors below.',
        errors: { username: 'Username must be 3-32 characters and can only contain letters, numbers, and _, ., -' },
        values: { username }
      });
    }

    if (password.length < 6) {
      return fail(400, {
        success: false,
        message: 'Registration failed. Please fix the errors below.',
        errors: { password: 'Password must be at least 6 characters long.' },
        values: { username }
      });
    }

    if (!/\d/.test(password)) {
        return fail(400, {
          success: false,
          message: 'Registration failed. Please fix the errors below.',
          errors: { password: 'Password must contain at least one number.' },
          values: { username }
        });
    }

    if (password !== confirm) {
      return fail(400, {
        success: false,
        message: 'Registration failed. Please fix the errors below.',
        errors: { confirm: 'Passwords do not match' },
        values: { username }
      });
    }

    try {
      await pb.collection('users').create({
        username,
        password,
        passwordConfirm: confirm
      });

      event.cookies.set('pb_auth', pb.authStore.token ?? '', {
        path: '/',
        httpOnly: true,
        sameSite: 'Lax',
        secure: import.meta.env.PROD,
        maxAge: 60 * 60 * 24 * 30
      });

      throw redirect(303, '/');
    } catch (err) {
      if (err instanceof ClientResponseError) {
        const errors: Record<string, string> = {};
        const data = (err as any).response?.data ?? {};

        for (const key in data) {
          const msg = data[key]?.message;
          if (msg) {
            if (key === 'passwordConfirm') errors.confirm = msg;
            else errors[key] = msg;
          }
        }

        if (!Object.keys(errors).length && (err as any).response?.message) {
          errors.username = (err as any).response.message;
        }

        return fail(400, {
          success: false,
          message: 'Registration failed. Please fix the errors below.',
          errors,
          values: { username }
        });
      }

      return fail(500, {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
        values: { username }
      });
    }
  }
};