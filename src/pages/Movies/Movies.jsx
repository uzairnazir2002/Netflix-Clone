import React from "react";
import "./Movies.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards.jsx";
import Footer from "../../components/Footer/Footer.jsx";

/**
 * Movies page - displays all movies by category
 * @returns {JSX.Element}
 */
const Movies = () => {
  return (
    <div className="movies">
      <Navbar />
      <div className="movies-container">
        <h1 className="page-title">Movies</h1>
        
        <div className="movies-content">
          <TitleCards 
            title={"Now Playing"} 
            category={"movie/now_playing"} 
          />
          <TitleCards 
            title={"Popular Movies"} 
            category={"movie/popular"} 
          />
          <TitleCards 
            title={"Top Rated"} 
            category={"movie/top_rated"} 
          />
          <TitleCards 
            title={"Upcoming"} 
            category={"movie/upcoming"} 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
