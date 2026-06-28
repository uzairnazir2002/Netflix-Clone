import React, { useEffect, useState } from "react";
import "./BrowseLanguages.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";
import { TMDBService } from "../../services/tmdbService";
import { TMDBLanguageStrategy } from "../../services/tmdbStrategy";
import { getTMDBImageUrl } from "../../config/tmdbConfig";
import { auth } from "../../firebase";
import { firestoreService } from "../../services/firestoreService";
import { toast } from "react-toastify";

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

const BrowseLanguages = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedLanguageName = languages.find((l) => l.code === selectedLanguage)?.name;

  useEffect(() => {
    const fetchLanguageTitles = async () => {
      setLoading(true);
      try {
        const tmdbService = new TMDBService(new TMDBLanguageStrategy());
        const data = await tmdbService.load({ language: selectedLanguage });
        setItems(data || []);
      } catch (error) {
        console.error("Failed to load language content:", error);
        toast.error("Could not load language content.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguageTitles();
  }, [selectedLanguage]);

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
      console.error("Failed to add language title:", error);
      toast.error("Could not add title to your list.");
    }
  };

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
                className={`language-btn ${selectedLanguage === lang.code ? "active" : ""}`}
                onClick={() => setSelectedLanguage(lang.code)}
                aria-pressed={selectedLanguage === lang.code}
                type="button"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="language-content">
          <p className="language-info">
            Showing content in: <strong>{selectedLanguageName}</strong>
          </p>

          {loading && <p className="language-loading">Loading titles...</p>}

          {!loading && (
            <div className="language-grid">
              {items.map((item) => {
                const imageUrl = getTMDBImageUrl(item.imagePath, "w500");
                return (
                  <div key={item.id} className="language-card">
                    <img
                      src={imageUrl.src}
                      srcSet={imageUrl.srcSet}
                      alt={item.title}
                      className="language-card-image"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.png";
                      }}
                    />
                    <div className="language-card-body">
                      <h3>{item.title}</h3>
                      <p>{item.releaseDate}</p>
                      <button
                        type="button"
                        className="card-save-btn"
                        onClick={(event) => handleAddToList(item, event)}
                      >
                        Add to My List
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseLanguages;
