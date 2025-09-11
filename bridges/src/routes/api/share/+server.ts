import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import pb from '$lib/pocketbase';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    
    console.log('📥 Received share configuration:', data);

    // Validate required data
    if (!data.fileId) {
      console.log('❌ Error: File ID is required but not provided');
      return json({ error: 'File ID is required' }, { status: 400 });
    }

    console.log('✅ File ID received:', data.fileId);

    // Generate a unique short ID
    const generateShortId = async (length: number = 8): Promise<string> => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let attempts = 0;
      
      while (attempts < 10) {
        let result = '';
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        // Check if this ID already exists
        try {
          await pb.collection('shares').getFirstListItem(`short_id = "${result}"`);
          // If we get here, the ID exists, try again
          attempts++;
        } catch (err) {
          // If we get an error, the ID doesn't exist, so we can use it
          return result;
        }
      }
      
      throw new Error('Could not generate a unique short ID after 10 attempts');
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
          return now + (24 * 60 * 60 * 1000);
      }
    };

    // Generate a unique short ID
    const shortId = await generateShortId();

    // Prepare the share record data
    const shareData = {
      file: data.fileId, // This should be the file ID from the upload
      expires_at: getExpirationTimestamp(data.expires),
      visibility: data.visibility,
      password: data.visibility === 'password' ? data.password : null,
      download_limit: data.downloadLimitEnabled ? data.downloadLimit : null,
      download_count: 0,
      view_once: data.viewOnce,
      embed_preview: data.embedPreview,
      short_id: shortId,
      is_active: true
    };

    console.log('📝 Creating share record with data:', shareData);

    // Create the share record in PocketBase
    const shareRecord = await pb.collection('shares').create(shareData);

    console.log('✅ Share record created:', shareRecord);

    // Generate the share link
    const baseUrl = 'http://localhost:5173';
    const shareLink = `${baseUrl}/share/${shareRecord.short_id}`;

    console.log('🔗 Share link generated:', shareLink);

    return json({
      success: true,
      link: shareLink,
      shareId: shareRecord.id,
      shortId: shareRecord.short_id
    });

  } catch (error) {
    console.error('🚨 SHARE GENERATION ERROR:', error);
    
    if (error instanceof Error) {
      return json({ 
        error: `Failed to generate share link: ${error.message}`,
        stack: error.stack
      }, { status: 500 });
    }
    
    return json({ 
      error: 'Failed to generate share link: Unknown error',
      details: JSON.stringify(error)
    }, { status: 500 });
  }
};