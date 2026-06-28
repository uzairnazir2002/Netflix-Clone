import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import { getTMDBImageUrl } from "../../config/tmdbConfig";
import { TMDBService } from "../../services/tmdbService";
import { TMDBCategoryStrategy } from "../../services/tmdbStrategy";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { firestoreService } from "../../services/firestoreService";

/**
 * TitleCards component - displays scrollable movie/tv show cards
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.category - Movie category from TMDB API
 * @returns {JSX.Element}
 */
const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardsRef = useRef();

  // Handle mouse wheel scroll for horizontal scrolling
  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  const handleAddToList = async (card, event) => {
    event.preventDefault();
    event.stopPropagation();

    const userId = auth.currentUser?.uid;
    if (!userId) {
      toast.error("Please sign in to add titles to your list.");
      return;
    }

    try {
      await firestoreService.addWatchlistItem(userId, card);
      toast.success(`${card.title} added to My List`);
    } catch (error) {
      console.error("Failed to add title to list:", error);
      toast.error("Could not add title to your list.");
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchMovies = async () => {
      try {
        const tmdbService = new TMDBService(new TMDBCategoryStrategy());
        const data = await tmdbService.load({ category });

        setApiData(data || []);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching movies:", err);
        setError("Failed to load content. Please try again later.");
        setApiData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  // Add wheel event listener
  useEffect(() => {
    const element = cardsRef.current;
    if (element) {
      element.addEventListener("wheel", handleWheel);
      
      // Cleanup listener on unmount
      return () => {
        element.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <div className="titlecards">
      <h2>{title || "Popular on Netflix"}</h2>

      {loading && <p style={{ color: "#999", padding: "20px" }}>Loading content...</p>}
      {error && <p style={{ color: "#ff4444", padding: "20px" }}>{error}</p>}

      {!loading && !error && apiData.length === 0 && (
        <p style={{ color: "#999", padding: "20px" }}>No content available</p>
      )}

      {!loading && apiData.length > 0 && (
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card) => {
            const imageUrl = getTMDBImageUrl(card.imagePath, "w500");
            return (
              <div key={card.id} className="card-wrapper">
                <Link to={`/player/${card.id}`}>
                  <div className="card">
                    <img
                      src={imageUrl.src}
                      srcSet={imageUrl.srcSet}
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt={card.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.png";
                      }}
                    />
                    <p>{card.title}</p>
                  </div>
                </Link>
                <button
                  type="button"
                  className="card-save-btn"
                  onClick={(event) => handleAddToList(card, event)}
                >
                  Add to My List
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// PropTypes validation
TitleCards.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
};

TitleCards.defaultProps = {
  title: "Popular on Netflix",
  category: "now_playing",
};

export default TitleCards;
