// src/routes/api/upload/+server.ts
import type { RequestHandler } from './$types';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // adjust if needed

export const POST: RequestHandler = async ({ request }) => {
  try {
    const incoming = await request.formData();

    const file = incoming.get('file') as File;
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Build the form for PocketBase with required fields
    const formData = new FormData();
    formData.append('file', file, file.name); // your file-type field
    formData.append('name', file.name);       // your text field
    formData.append('size', String(file.size)); // your number field
    formData.append('type', file.type || 'application/octet-stream'); // your text field

    const record = await pb.collection('files').create(formData);

    return new Response(JSON.stringify({ success: true, record }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Upload error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
