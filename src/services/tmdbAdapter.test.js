import { describe, expect, it } from "vitest";
import { TMDBAdapter } from "./tmdbAdapter";

describe("TMDBAdapter", () => {
  it("maps raw movie data to a normalized card item", () => {
    const item = TMDBAdapter.toCardItem({
      id: 42,
      original_title: "Sample Movie",
      backdrop_path: "/sample.jpg",
      overview: "Overview text",
      release_date: "2026-01-01",
    });

    expect(item).toMatchObject({
      id: 42,
      title: "Sample Movie",
      imagePath: "/sample.jpg",
      overview: "Overview text",
      releaseDate: "2026-01-01",
    });
  });

  it("returns the best trailer from a result list", () => {
    const trailer = TMDBAdapter.toTrailerModel([
      { type: "Teaser", site: "YouTube", key: "a" },
      { type: "Trailer", site: "YouTube", key: "b", name: "Main Trailer" },
    ]);

    expect(trailer).toMatchObject({
      key: "b",
      name: "Main Trailer",
      type: "Trailer",
      site: "YouTube",
    });
  });
});
