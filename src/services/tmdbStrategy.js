import { getTMDBOptions } from '../config/tmdbConfig.js';
import { TMDBRequestFactory } from './tmdbRequestFactory.js';
import { TMDBAdapter } from './tmdbAdapter.js';

class TMDBStrategy {
  async fetch() {
    throw new Error('Strategy.fetch() must be implemented by subclasses');
  }
}

export class TMDBCategoryStrategy extends TMDBStrategy {
  async fetch({ category }) {
    const options = getTMDBOptions();
    const request = TMDBRequestFactory.createRequest('category', { category });

    const response = await fetch(request.endpoint, options);
    if (!response.ok) {
      throw new Error(`TMDB category request failed with status ${response.status}`);
    }

    const data = await response.json();
    return TMDBAdapter.toCardList(data.results || []);
  }
}

export class TMDBLanguageStrategy extends TMDBStrategy {
  async fetch({ language }) {
    const options = getTMDBOptions();
    const request = TMDBRequestFactory.createRequest('language', { language });

    const response = await fetch(request.endpoint, options);
    if (!response.ok) {
      throw new Error(`TMDB language request failed with status ${response.status}`);
    }

    const data = await response.json();
    return TMDBAdapter.toCardList(data.results || []);
  }
}

export class TMDBSearchStrategy extends TMDBStrategy {
  async fetch({ query }) {
    const trimmedQuery = String(query || '').trim();
    if (!trimmedQuery) return [];

    const options = getTMDBOptions();
    const request = TMDBRequestFactory.createRequest('search', { query: trimmedQuery });

    const response = await fetch(request.endpoint, options);
    if (!response.ok) {
      throw new Error(`TMDB search request failed with status ${response.status}`);
    }

    const data = await response.json();
    return TMDBAdapter.toCardList(data.results || []);
  }
}

export class TMDBTrailerStrategy extends TMDBStrategy {
  async fetch({ id }) {
    const options = getTMDBOptions();
    const request = TMDBRequestFactory.createRequest('trailer', { id });

    const response = await fetch(request.endpoint, options);
    if (!response.ok) {
      throw new Error(`TMDB trailer request failed with status ${response.status}`);
    }

    const data = await response.json();
    return TMDBAdapter.toTrailerModel(data.results || []);
  }
}
