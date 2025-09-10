import type { RequestHandler } from './$types';
import { pb } from '$lib/pocketbase';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.fileId) {
      return json({ error: 'File ID is required' }, { status: 400 });
    }

    // Generate a unique short ID
    const generateShortId = (length: number = 8): string => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    // Convert expiration string to timestamp
    const getExpirationTimestamp = (expiration: string): number | null => {
      if (expiration === 'never') return null;
      
      const now = Date.now();
      switch (expiration) {
        case '1h':
          return now + (1 * 60 * 60 * 1000);
        case '24h':
          return now + (24 * 60 * 60 * 1000);
        case '7d':
          return now + (7 * 24 * 60 * 60 * 1000);
        case '30d':
          return now + (30 * 24 * 60 * 60 * 1000);
        case '1y':
          return now + (365 * 24 * 60 * 60 * 1000);
        default:
          return now + (24 * 60 * 60 * 1000); // default 24h
      }
    };

    // Prepare the share record data
    const shareData = {
      file: data.fileId,
      owner: locals.user?.id || null, // Assuming you have user authentication
      expires_at: getExpirationTimestamp(data.expires),
      visibility: data.visibility,
      password: data.visibility === 'password' ? data.password : null,
      download_limit: data.downloadLimitEnabled ? data.downloadLimit : null,
      download_count: 0,
      view_once: data.viewOnce,
      embed_preview: data.embedPreview,
      short_id: generateShortId(),
      is_active: true
    };

    // Create the share record in PocketBase
    // Note: You need to have a 'shares' collection in PocketBase
    const shareRecord = await pb.collection('shares').create(shareData);

    // Generate the share link
    const baseUrl = request.headers.get('origin') || 'http://localhost:5173';
    const shareLink = `${baseUrl}/share/${shareRecord.short_id}`;

    return json({
      success: true,
      link: shareLink,
      shareId: shareRecord.id,
      shortId: shareRecord.short_id
    });

  } catch (error) {
    console.error('Share generation error:', error);
    return json({ 
      error: error instanceof Error ? error.message : 'Failed to generate share link' 
    }, { status: 500 });
  }
};