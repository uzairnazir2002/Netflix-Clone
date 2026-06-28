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
      case 'language':
        return {
          endpoint: `${TMDB_BASE_URL}/discover/movie?with_original_language=${options.language || 'en'}&sort_by=popularity.desc&page=1`
        };
      case 'search':
        return {
          endpoint: `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(options.query || '')}&include_adult=false&language=en-US&page=1`
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
