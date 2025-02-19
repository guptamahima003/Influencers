import { INSTAGRAM_CONFIG } from '../config/instagram';

interface InstagramMedia {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  username: string;
  timestamp: string;
}

export async function fetchInstagramHashtagMedia() {
  try {
    // First, get the hashtag ID
    const hashtagResponse = await fetch(
      `https://graph.instagram.com/ig_hashtag_search?user_id=${INSTAGRAM_CONFIG.clientId}&q=${INSTAGRAM_CONFIG.hashtag}&access_token=${INSTAGRAM_CONFIG.accessToken}`
    );
    const { data: [{ id: hashtagId }] } = await hashtagResponse.json();

    // Then fetch recent media with this hashtag
    const mediaResponse = await fetch(
      `https://graph.instagram.com/${hashtagId}/recent_media?fields=id,caption,media_type,media_url,thumbnail_url,username,timestamp&access_token=${INSTAGRAM_CONFIG.accessToken}`
    );
    const { data } = await mediaResponse.json();

    return data as InstagramMedia[];
  } catch (error) {
    console.error('Error fetching Instagram media:', error);
    return [];
  }
} 