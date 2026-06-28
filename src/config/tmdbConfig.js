/**
 * TMDB API Configuration and utility functions
 * All API keys are loaded from environment variables for security
 */

export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Returns TMDB API request options with authorization header
 * @returns {Object} Fetch options object
 */
export const getTMDBOptions = () => {
  if (!TMDB_API_KEY) {
    console.error('TMDB API key is not configured. Please set VITE_TMDB_API_KEY in .env.local');
  }
  
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`
    }
  };
};

/**
 * Constructs a TMDB image URL with responsive srcset
 * @param {string} imagePath - The image path from TMDB API
 * @param {string} defaultSize - Default image size (default: w500)
 * @returns {Object} Object with src and srcSet
 */
export const getTMDBImageUrl = (imagePath, defaultSize = 'w500') => {
  if (!imagePath) {
    return {
      src: '/placeholder-image.png',
      srcSet: ''
    };
  }

  return {
    src: `${TMDB_IMAGE_BASE_URL}/${defaultSize}${imagePath}`,
    srcSet: `
      ${TMDB_IMAGE_BASE_URL}/w185${imagePath} 185w,
      ${TMDB_IMAGE_BASE_URL}/w342${imagePath} 342w,
      ${TMDB_IMAGE_BASE_URL}/w500${imagePath} 500w,
      ${TMDB_IMAGE_BASE_URL}/w780${imagePath} 780w
    `.trim()
  };
};
