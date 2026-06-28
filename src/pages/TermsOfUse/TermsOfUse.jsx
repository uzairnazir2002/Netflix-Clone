import React from "react";
import "./TermsOfUse.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

/**
 * TermsOfUse page - legal terms and conditions
 * @returns {JSX.Element}
 */
const TermsOfUse = () => {
  return (
    <div className="terms-of-use">
      <Navbar />
      <div className="terms-container">
        <div className="terms-header">
          <h1>Terms of Use</h1>
          <p>Last updated: January 2025</p>
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Service Description</h2>
            <p>
              Netflix Clone is a streaming platform that provides access to movies and television shows. By accessing and using this service, you agree to be bound by the terms and conditions set forth in this agreement.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Acceptable Use</h2>
            <p>
              You agree not to use this service to:
            </p>
            <ul className="terms-list">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Transmit harmful or malicious code</li>
              <li>Engage in harassment or abusive behavior</li>
              <li>Attempt to gain unauthorized access</li>
              <li>Distribute or sell any content from the platform</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>4. Content License</h2>
            <p>
              The content provided through Netflix Clone is licensed for personal, non-commercial use only. You may not download, reproduce, distribute, transmit, display, or perform any content except for personal use on authorized devices.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Intellectual Property Rights</h2>
            <p>
              All content, including but not limited to text, graphics, logos, images, audio clips, and digital downloads are the property of Netflix Clone or its content suppliers and are protected by international copyright laws.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Limitation of Liability</h2>
            <p>
              Netflix Clone is provided "as is" without any representations or warranties, express or implied. We do not warrant that the service will be uninterrupted or error-free. To the fullest extent permissible by law, Netflix Clone shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for conduct that violates these Terms of Use. Upon termination, your right to use the service will immediately cease.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service following the posting of revised Terms of Use means that you accept and agree to the changes.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Governing Law</h2>
            <p>
              These Terms of Use are governed by and construed in accordance with the laws of the jurisdiction in which Netflix Clone operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at support@netflixclone.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
