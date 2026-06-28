import { TMDB_BASE_URL } from '../config/tmdbConfig.js';

/**
 * Factory for creating TMDB endpoint URLs.
 */
export class TMDBRequestFactory {
  static createRequest(type, options = {}) {
    switch (type) {
      case 'category':
        return {
          endpoint: `${TMDB_BASE_URL}/${options.category || 'movie/now_playing'}?language=en-US&page=1`
        };
      case 'trailer':
        return {
          endpoint: `${TMDB_BASE_URL}/movie/${options.id}/videos?language=en-US`
        };
      default:
        throw new Error(`Unsupported TMDB request type: ${type}`);
    }
  }
}
