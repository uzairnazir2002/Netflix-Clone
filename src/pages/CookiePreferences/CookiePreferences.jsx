import React, { useState } from "react";
import "./CookiePreferences.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

/**
 * CookiePreferences page - cookie consent and management
 * @returns {JSX.Element}
 */
const CookiePreferences = () => {
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false,
    personalization: true
  });

  const handleToggle = (type) => {
    if (type !== "essential") {
      setPreferences(prev => ({
        ...prev,
        [type]: !prev[type]
      }));
    }
  };

  const handleSave = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    alert("Cookie preferences saved successfully!");
  };

  return (
    <div className="cookie-preferences">
      <Navbar />
      <div className="cookie-container">
        <div className="cookie-header">
          <h1>Cookie Preferences</h1>
          <p>Manage your cookie settings and data preferences</p>
        </div>

        <div className="cookie-content">
          <section className="cookie-info">
            <h2>What are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device that help us personalize your experience, analyze usage, and improve our service. We use different types of cookies for different purposes.
            </p>
          </section>

          <section className="cookie-types">
            <h2>Cookie Categories</h2>

            <div className="cookie-item essential">
              <div className="cookie-header-item">
                <div className="cookie-info-left">
                  <h3>Essential Cookies</h3>
                  <p>Required for basic functionality. Cannot be disabled.</p>
                </div>
                <div className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    aria-label="Essential cookies"
                  />
                </div>
              </div>
              <details className="cookie-details">
                <summary>Learn more</summary>
                <p>These cookies enable core functionality like authentication, security, and platform features. They are necessary for the website to function properly.</p>
              </details>
            </div>

            <div className="cookie-item analytics">
              <div className="cookie-header-item">
                <div className="cookie-info-left">
                  <h3>Analytics Cookies</h3>
                  <p>Help us understand how you use our service.</p>
                </div>
                <div className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handleToggle("analytics")}
                    aria-label="Analytics cookies"
                  />
                </div>
              </div>
              <details className="cookie-details">
                <summary>Learn more</summary>
                <p>Analytics cookies collect information about how visitors use our site, helping us improve performance and user experience. Data is aggregated and anonymous.</p>
              </details>
            </div>

            <div className="cookie-item marketing">
              <div className="cookie-header-item">
                <div className="cookie-info-left">
                  <h3>Marketing Cookies</h3>
                  <p>Used for targeted advertising and promotional content.</p>
                </div>
                <div className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handleToggle("marketing")}
                    aria-label="Marketing cookies"
                  />
                </div>
              </div>
              <details className="cookie-details">
                <summary>Learn more</summary>
                <p>Marketing cookies track your browsing habits to show you relevant ads and promotions. You can opt-out if you prefer not to see personalized marketing.</p>
              </details>
            </div>

            <div className="cookie-item personalization">
              <div className="cookie-header-item">
                <div className="cookie-info-left">
                  <h3>Personalization Cookies</h3>
                  <p>Enhance your personalized experience and recommendations.</p>
                </div>
                <div className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.personalization}
                    onChange={() => handleToggle("personalization")}
                    aria-label="Personalization cookies"
                  />
                </div>
              </div>
              <details className="cookie-details">
                <summary>Learn more</summary>
                <p>These cookies remember your preferences and help us provide personalized content and recommendations tailored to your interests.</p>
              </details>
            </div>
          </section>

          <div className="cookie-actions">
            <button className="btn-save" onClick={handleSave}>Save Preferences</button>
            <button className="btn-accept-all" onClick={() => {
              setPreferences({ essential: true, analytics: true, marketing: true, personalization: true });
              handleSave();
            }}>Accept All</button>
            <button className="btn-reject-all" onClick={() => {
              setPreferences({ essential: true, analytics: false, marketing: false, personalization: false });
              handleSave();
            }}>Reject Non-Essential</button>
          </div>

          <section className="cookie-info">
            <h2>Your Privacy Rights</h2>
            <p>
              You can update these preferences at any time by visiting this page. For more information about how we use your data, please read our <a href="/privacy">Privacy Policy</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePreferences;
