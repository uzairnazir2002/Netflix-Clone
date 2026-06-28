import React, { useState } from "react";
import "./BrowseLanguages.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards.jsx";
import Footer from "../../components/Footer/Footer.jsx";

/**
 * BrowseLanguages page - browse content by language
 * @returns {JSX.Element}
 */
const BrowseLanguages = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "ru", name: "Russian" },
  ];

  return (
    <div className="browse-languages">
      <Navbar />
      <div className="browse-languages-container">
        <h1 className="page-title">Browse by Language</h1>

        <div className="language-selector">
          <p>Select a language to browse content:</p>
          <div className="language-buttons">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`language-btn ${
                  selectedLanguage === lang.code ? "active" : ""
                }`}
                onClick={() => setSelectedLanguage(lang.code)}
                aria-pressed={selectedLanguage === lang.code}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="language-content">
          <p className="language-info">
            Showing content in: <strong>{languages.find(l => l.code === selectedLanguage)?.name}</strong>
          </p>
          <TitleCards 
            title={`Popular in ${languages.find(l => l.code === selectedLanguage)?.name}`}
            category={"movie/popular"} 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseLanguages;
