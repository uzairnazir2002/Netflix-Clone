import React from "react";
import "./TVShows.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards.jsx";
import Footer from "../../components/Footer/Footer.jsx";

/**
 * TVShows page - displays all TV shows by category
 * @returns {JSX.Element}
 */
const TVShows = () => {
  return (
    <div className="tvshows">
      <Navbar />
      <div className="tvshows-container">
        <h1 className="page-title">TV Shows</h1>
        
        <div className="tvshows-content">
          <TitleCards 
            title={"Popular TV Shows"} 
            category={"tv/popular"} 
          />
          <TitleCards 
            title={"Top Rated TV Shows"} 
            category={"tv/top_rated"} 
          />
          <TitleCards 
            title={"On The Air Today"} 
            category={"tv/on_the_air"} 
          />
          <TitleCards 
            title={"Airing Today"} 
            category={"tv/airing_today"} 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TVShows;
