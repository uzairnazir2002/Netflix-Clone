import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams, useNavigate } from 'react-router-dom'
import { TMDBService } from '../../services/tmdbService'
import { TMDBTrailerStrategy } from '../../services/tmdbStrategy'

/**
 * Player component - displays movie trailer video
 * @returns {JSX.Element}
 */
const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchTrailer = async () => {
      try {
        const tmdbService = new TMDBService(new TMDBTrailerStrategy());
        const trailer = await tmdbService.load({ id });

        if (trailer) {
          setApiData(trailer);
          setError(null);
        } else {
          setError("No trailer available for this movie");
          setApiData(null);
        }
      } catch (err) {
        console.error("❌ Error fetching trailer:", err);
        setError("Failed to load trailer. Please try again later.");
        setApiData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrailer();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="player">
      <button 
        onClick={handleGoBack}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          zIndex: 10,
          position: 'absolute'
        }}
        aria-label="Go back"
      >
        <img src={back_arrow_icon} alt="Go back" />
      </button>

      {loading && (
        <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          Loading trailer...
        </p>
      )}

      {error && (
        <p style={{ color: "#ff4444", textAlign: "center", marginTop: "50px" }}>
          {error}
        </p>
      )}

      {!loading && !error && apiData ? (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1`}
            title={apiData.name || "Movie trailer"}
            frameBorder="0"
            width="90%"
            height="90%"
            allowFullScreen
            allow="autoplay; encrypted-media"
          />

          <div className="player-info">
            <p>{apiData.published_at?.slice(0, 10) || "N/A"}</p>
            <p>{apiData.name || "Trailer"}</p>
            <p>{apiData.type || "Video"}</p>
          </div>
        </>
      ) : !loading && !error ? (
        <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          No trailer available
        </p>
      ) : null}
    </div>
  );
};

export default Player;
