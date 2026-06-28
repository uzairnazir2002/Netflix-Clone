import React from "react";
import "./Privacy.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

/**
 * Privacy page - privacy policy and data protection information
 * @returns {JSX.Element}
 */
const Privacy = () => {
  return (
    <div className="privacy">
      <Navbar />
      <div className="privacy-container">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: January 2025</p>
        </div>

        <div className="privacy-content">
          <section className="privacy-section">
            <h2>Introduction</h2>
            <p>
              Netflix Clone ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process your personal information.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Information We Collect</h2>
            <p>We collect information in the following ways:</p>
            <ul className="privacy-list">
              <li><strong>Account Information:</strong> Email address, name, password, and profile preferences</li>
              <li><strong>Viewing Information:</strong> Watch history, ratings, and saved titles</li>
              <li><strong>Device Information:</strong> Device type, OS, browser, and IP address</li>
              <li><strong>Usage Information:</strong> Pages visited, features used, and interaction patterns</li>
              <li><strong>Payment Information:</strong> Billing address and transaction history (processed securely)</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="privacy-list">
              <li>Provide and improve our services</li>
              <li>Personalize your experience and recommendations</li>
              <li>Process payments and prevent fraud</li>
              <li>Send important updates and customer service messages</li>
              <li>Analyze usage patterns to enhance our platform</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="privacy-list">
              <li>Service providers who assist with our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Third parties with your explicit consent</li>
              <li>Business partners in case of merger or acquisition</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is completely secure.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Your Privacy Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="privacy-list">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience. Cookies help us remember your preferences, understand usage patterns, and improve our service. You can control cookie settings in your browser.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect information from children under 13. If we become aware of such collection, we will take steps to delete the information promptly.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice on our website.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at privacy@netflixclone.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
