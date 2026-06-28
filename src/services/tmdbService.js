/**
 * TMDBService uses the Strategy design pattern to execute different request types.
 */
export class TMDBService {
  constructor(strategy) {
    this.strategy = strategy;
  }

  async load(payload) {
    if (!this.strategy || typeof this.strategy.fetch !== 'function') {
      throw new Error('TMDBService requires a valid strategy instance');
    }

    return this.strategy.fetch(payload);
  }
}
