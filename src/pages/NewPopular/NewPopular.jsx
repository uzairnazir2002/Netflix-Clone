import React from "react";
import "./NewPopular.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards.jsx";
import Footer from "../../components/Footer/Footer.jsx";

/**
 * NewPopular page - displays new and popular content
 * @returns {JSX.Element}
 */
const NewPopular = () => {
  return (
    <div className="newpopular">
      <Navbar />
      <div className="newpopular-container">
        <h1 className="page-title">New & Popular</h1>
        
        <div className="newpopular-content">
          <TitleCards 
            title={"Trending Now"} 
            category={"movie/popular"} 
          />
          <TitleCards 
            title={"New Releases"} 
            category={"movie/upcoming"} 
          />
          <TitleCards 
            title={"Popular TV Shows"} 
            category={"tv/popular"} 
          />
          <TitleCards 
            title={"Top Movies This Week"} 
            category={"movie/top_rated"} 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewPopular;
