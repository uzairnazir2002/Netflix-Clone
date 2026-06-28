import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import youtube_icon from '../../assets/youtube_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'

/**
 * Footer component - displays social links and legal information
 * @returns {JSX.Element}
 */
const Footer = () => {
  const socialLinks = [
    { icon: facebook_icon, alt: "Facebook", url: "https://facebook.com" },
    { icon: instagram_icon, alt: "Instagram", url: "https://instagram.com" },
    { icon: twitter_icon, alt: "Twitter", url: "https://twitter.com" },
    { icon: youtube_icon, alt: "YouTube", url: "https://youtube.com" }
  ];

  const footerLinks = [
    { label: "Help Center", path: "/help-center" },
    { label: "Jobs", path: "/jobs" },
    { label: "Terms of Use", path: "/terms-of-use" },
    { label: "Privacy", path: "/privacy" },
    { label: "Cookie Preferences", path: "/cookie-preferences" },
    { label: "Contact Us", path: "/contact-us" },
    { label: "Feedback", path: "/feedback" }
  ];

  return (
    <div className='footer'>
      <div className="footer-content">
        <div className="footer-icons">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${social.alt} page`}
              className="social-icon"
            >
              <img src={social.icon} alt={social.alt} />
            </a>
          ))}
        </div>
        <ul className='footer-links'>
          {footerLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <p className='copyright-text'>&copy; 1997-2025 Netflix Clone, Inc. All rights reserved.</p>
    </div>
  )
}

export default Footer
