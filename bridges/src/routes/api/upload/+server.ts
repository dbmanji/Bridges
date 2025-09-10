import type { RequestHandler } from './$types';
import PocketBase from 'pocketbase';

// point this to your running PB server (adjust if needed)
const pb = new PocketBase('http://127.0.0.1:8090');

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const formData = await request.formData();

    // get currently logged in user
    if (!locals.user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
    }

    // upload file to "files" collection (change if yours is different)
    const record = await pb.collection('files').create(formData);

    return new Response(JSON.stringify({ success: true, record }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Upload error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
