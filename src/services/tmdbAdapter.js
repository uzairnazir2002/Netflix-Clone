/**
 * Adapter to convert raw TMDB API payloads into normalized app data.
 */
export class TMDBAdapter {
  static toCardItem(rawCard) {
    return {
      id: rawCard.id,
      title: rawCard.original_title || rawCard.name || rawCard.title || 'Untitled',
      imagePath: rawCard.backdrop_path || rawCard.poster_path || '',
      overview: rawCard.overview || '',
      releaseDate: rawCard.release_date || rawCard.first_air_date || 'Unknown',
      mediaType: rawCard.media_type || 'movie'
    };
  }

  static toCardList(rawResults) {
    return rawResults.map((item) => this.toCardItem(item));
  }

  static toTrailerModel(rawResults) {
    if (!Array.isArray(rawResults) || rawResults.length === 0) {
      return null;
    }

    const trailer = rawResults.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    ) || rawResults[0];

    return {
      key: trailer.key,
      name: trailer.name || 'Trailer',
      type: trailer.type || 'Video',
      publishedAt: trailer.published_at || trailer.publishedAt || 'Unknown',
      site: trailer.site || 'YouTube'
    };
  }
}
