import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./SearchResults.css";
import { TMDBService } from "../../services/tmdbService";
import { TMDBSearchStrategy } from "../../services/tmdbStrategy";
import { getTMDBImageUrl } from "../../config/tmdbConfig";
import { auth } from "../../firebase";
import { firestoreService } from "../../services/firestoreService";
import { toast } from "react-toastify";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const title = useMemo(() => {
    return query ? `Search results for "${query}"` : "Search Netflix";
  }, [query]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setItems([]);
        return;
      }

      setLoading(true);
      try {
        const tmdbService = new TMDBService(new TMDBSearchStrategy());
        const data = await tmdbService.load({ query });
        setItems(data || []);
      } catch (error) {
        console.error("Search failed:", error);
        toast.error("Could not load search results.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleAddToList = async (item, event) => {
    event.preventDefault();
    event.stopPropagation();

    const userId = auth.currentUser?.uid;
    if (!userId) {
      toast.error("Please sign in to add titles to your list.");
      return;
    }

    try {
      await firestoreService.addWatchlistItem(userId, item);
      toast.success(`${item.title} added to My List`);
    } catch (error) {
      console.error("Failed to add search result:", error);
      toast.error("Could not add title to your list.");
    }
  };

  return (
    <div className="search-results-page">
      <Navbar />
      <div className="search-results-container">
        <h1 className="page-title">{title}</h1>

        {loading && <p className="search-loading">Searching...</p>}

        {!loading && !query.trim() && (
          <p className="search-empty">Use the search bar in the navbar to find movies and shows.</p>
        )}

        {!loading && query.trim() && items.length === 0 && (
          <p className="search-empty">No results found for "{query}".</p>
        )}

        {!loading && items.length > 0 && (
          <div className="search-grid">
            {items.map((item) => {
              const imageUrl = getTMDBImageUrl(item.imagePath, "w500");
              return (
                <div key={item.id} className="search-card">
                  <Link to={`/player/${item.id}`} className="search-card-link">
                    <img
                      src={imageUrl.src}
                      srcSet={imageUrl.srcSet}
                      alt={item.title}
                      className="search-card-image"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.png";
                      }}
                    />
                    <h3>{item.title}</h3>
                  </Link>
                  <button
                    type="button"
                    className="card-save-btn"
                    onClick={(event) => handleAddToList(item, event)}
                  >
                    Add to My List
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
