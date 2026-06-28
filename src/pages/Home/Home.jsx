import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards.jsx";
import Footer from "../../components/Footer/Footer.jsx";

/**
 * Home component - main landing page with featured content
 * @returns {JSX.Element}
 */
const Home = () => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  // Featured movie data
  const featuredMovie = {
    id: 693134,
    title: "Assassin's Creed",
    description: "Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy",
    releaseDate: "2024",
    rating: "PG-13",
    genre: "Action/Adventure"
  };

  const handlePlay = () => {
    // Navigate to player with the featured movie ID
    navigate(`/player/${featuredMovie.id}`);
  };

  const handleMoreInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="Featured movie banner" className="banner_img" />
        <div className="hero-caption">
          <img src={hero_title} alt="Featured title" className="caption_img" />
          <p className="description">
            {featuredMovie.description}
          </p>
          <div className="hero-btns">
            <button 
              className="btn play-btn"
              onClick={handlePlay}
              aria-label="Play featured movie"
            >
              <img src={play_icon} alt="Play icon" />
              Play
            </button>
            <button 
              className="btn dark-btn info-btn"
              onClick={handleMoreInfo}
              aria-label="Show more information about featured movie"
            >
              <img src={info_icon} alt="Info icon" />
              More Info
            </button>
          </div>

          {/* Info Modal */}
          {showInfo && (
            <div className="info-modal">
              <div className="modal-content">
                <button 
                  className="close-btn" 
                  onClick={handleMoreInfo}
                  aria-label="Close information modal"
                >
                  ×
                </button>
                <h2>{featuredMovie.title}</h2>
                <div className="movie-details">
                  <span className="detail-item">
                    <strong>Release Date:</strong> {featuredMovie.releaseDate}
                  </span>
                  <span className="detail-item">
                    <strong>Rating:</strong> {featuredMovie.rating}
                  </span>
                  <span className="detail-item">
                    <strong>Genre:</strong> {featuredMovie.genre}
                  </span>
                </div>
                <p className="modal-description">{featuredMovie.description}</p>
                <button 
                  className="btn play-btn modal-play"
                  onClick={handlePlay}
                >
                  <img src={play_icon} alt="Play icon" />
                  Play Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"movie/top_rated"} />
        <TitleCards title={"Only on NetFlix"} category={"movie/popular"} />
        <TitleCards title={"Upcoming"} category={"movie/upcoming"} />
        <TitleCards title={"Top Picks For You"} category={"movie/now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
