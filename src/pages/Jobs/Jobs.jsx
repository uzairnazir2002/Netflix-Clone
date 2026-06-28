import React from "react";
import "./Jobs.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

/**
 * Jobs page - career opportunities and job listings
 * @returns {JSX.Element}
 */
const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      description: "Build scalable React applications with modern web technologies."
    },
    {
      id: 2,
      title: "Backend Engineer",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "4+ years",
      description: "Develop and maintain our API infrastructure and database systems."
    },
    {
      id: 3,
      title: "Product Manager",
      location: "New York, NY",
      type: "Full-time",
      experience: "3+ years",
      description: "Lead product strategy and roadmap for streaming platform features."
    },
    {
      id: 4,
      title: "UX/UI Designer",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Design beautiful and intuitive interfaces for web and mobile."
    },
    {
      id: 5,
      title: "Data Analyst",
      location: "Seattle, WA",
      type: "Full-time",
      experience: "2+ years",
      description: "Analyze user behavior and drive product decisions with data insights."
    },
    {
      id: 6,
      title: "DevOps Engineer",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Manage cloud infrastructure and deployment pipelines."
    }
  ];

  return (
    <div className="jobs">
      <Navbar />
      <div className="jobs-container">
        <div className="jobs-header">
          <h1>Join Our Team</h1>
          <p>We're hiring talented people to help us build the future of streaming</p>
        </div>

        <div className="jobs-benefits">
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Competitive Salary</h3>
            <p>Market-leading compensation and equity packages</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🏥</div>
            <h3>Health Benefits</h3>
            <p>Medical, dental, and vision coverage for you and your family</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🏠</div>
            <h3>Remote Work</h3>
            <p>Flexible work arrangements and remote opportunities</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📚</div>
            <h3>Learning & Development</h3>
            <p>Professional development and training budgets</p>
          </div>
        </div>

        <div className="jobs-list">
          <h2>Open Positions</h2>
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <span className="job-type">{job.type}</span>
                </div>
                <p className="job-description">{job.description}</p>
                <div className="job-meta">
                  <span className="meta-item">📍 {job.location}</span>
                  <span className="meta-item">💼 {job.experience}</span>
                </div>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))}
          </div>
        </div>

        <div className="company-culture">
          <h2>Why Work With Us?</h2>
          <div className="culture-grid">
            <div className="culture-item">
              <h3>Innovation</h3>
              <p>Work on cutting-edge technology that impacts millions of users worldwide.</p>
            </div>
            <div className="culture-item">
              <h3>Diversity</h3>
              <p>We value diverse perspectives and create an inclusive workplace for everyone.</p>
            </div>
            <div className="culture-item">
              <h3>Growth</h3>
              <p>Continuous learning opportunities and clear career advancement paths.</p>
            </div>
            <div className="culture-item">
              <h3>Impact</h3>
              <p>Make a real difference by building products used by millions globally.</p>
            </div>
          </div>
        </div>

        <div className="jobs-cta">
          <h2>Don't see what you're looking for?</h2>
          <p>Send us your resume and let us know what role you're interested in!</p>
          <a href="mailto:careers@netflixclone.com" className="cta-button">Send Your Resume</a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
