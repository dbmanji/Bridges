// src/routes/share/[shortId]/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { redirect, error } from '@sveltejs/kit';
import pb from '$lib/pocketbase';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const shortId = params.shortId;
    
    // Find the share record
    const shareRecord = await pb.collection('shares').getFirstListItem(`short_id = "${shortId}" AND is_active = true`);
    
    // Check if expired
    if (shareRecord.expires_at && new Date(shareRecord.expires_at) < new Date()) {
      await pb.collection('shares').update(shareRecord.id, { is_active: false });
      throw error(410, 'This share link has expired');
    }
    
    // Get the file
    const fileRecord = await pb.collection('files').getOne(shareRecord.file);
    
    return {
      share: shareRecord,
      file: fileRecord
    };
  } catch (err) {
    throw error(404, 'Share link not found');
  }
};

export const actions = {
  download: async ({ request, params }) => {
    try {
      const shortId = params.shortId;
      
      // Find the share record
      const shareRecord = await pb.collection('shares').getFirstListItem(`short_id = "${shortId}" AND is_active = true`);
      
      // Check download limit
      if (shareRecord.download_limit !== null && shareRecord.download_count >= shareRecord.download_limit) {
        throw error(403, 'Download limit reached');
      }
      
      // Increment download count
      await pb.collection('shares').update(shareRecord.id, {
        download_count: shareRecord.download_count + 1
      });
      
      // If view_once, deactivate after this download
      if (shareRecord.view_once) {
        await pb.collection('shares').update(shareRecord.id, {
          is_active: false
        });
      }
      
      // Redirect to the actual file
      const fileRecord = await pb.collection('files').getOne(shareRecord.file);
      const fileUrl = `${pb.baseUrl}/api/files/files/${fileRecord.id}/${fileRecord.file}`;
      
      throw redirect(302, fileUrl);
      
    } catch (err) {
      throw error(500, 'Download failed');
    }
  }
};