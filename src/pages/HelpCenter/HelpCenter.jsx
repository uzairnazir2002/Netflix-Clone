import React, { useEffect, useMemo, useState } from "react";
import "./HelpCenter.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const SOCKET_URL = import.meta.env.VITE_FAQ_SOCKET_URL || "ws://localhost:8787";

const HelpCenter = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [connectionState, setConnectionState] = useState("Connecting");
  const [socketAnswer, setSocketAnswer] = useState("");
  const [faqQuestion, setFaqQuestion] = useState("");

  const faqs = useMemo(
    () => [
      {
        id: 1,
        question: "How do I create an account?",
        answer: "Go to Login, switch to Sign Up, and complete the form.",
      },
      {
        id: 2,
        question: "Can I download content to watch offline?",
        answer: "The player page demonstrates trailer playback and can be extended for offline downloads.",
      },
      {
        id: 3,
        question: "How do I add titles to My List?",
        answer: "Click Add to My List on any title card and manage it from the My List page.",
      },
      {
        id: 4,
        question: "Can I change my streaming quality?",
        answer: "Playback quality depends on the platform and connection. The app keeps the player responsive.",
      },
      {
        id: 5,
        question: "How many devices can watch at once?",
        answer: "The project does not enforce plan limits, but it demonstrates authentication and route protection.",
      },
      {
        id: 6,
        question: "What should I do if a video won't play?",
        answer: "Try refreshing the page, checking your internet connection, or reopening the player.",
      },
    ],
    [],
  );

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => setConnectionState("Connected");
    socket.onclose = () => setConnectionState("Disconnected");
    socket.onerror = () => setConnectionState("Error");
    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === "welcome") {
          setSocketAnswer(payload.message);
        }
        if (payload.type === "faq_answer") {
          setSocketAnswer(payload.answer);
        }
        if (payload.type === "faq_error") {
          setSocketAnswer(payload.message);
        }
      } catch (error) {
        console.error("FAQ socket parse error:", error);
      }
    };

    return () => socket.close();
  }, []);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const askSocketFaq = (e) => {
    e.preventDefault();
    if (!faqQuestion.trim()) return;

    try {
      const socket = new WebSocket(SOCKET_URL);
      socket.onopen = () => {
        socket.send(JSON.stringify({
          type: "faq_question",
          question: faqQuestion,
        }));
      };
      socket.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        if (payload.type === "faq_answer") {
          setSocketAnswer(payload.answer);
        }
      };
    } catch (error) {
      console.error("FAQ socket send failed:", error);
    }
  };

  return (
    <div className="help-center">
      <Navbar />
      <div className="help-container">
        <div className="help-header">
          <h1>Help Center</h1>
          <p>Frequently asked questions plus a live socket-powered response box.</p>
        </div>

        <div className="help-search">
          <form onSubmit={askSocketFaq}>
            <input
              type="text"
              placeholder="Ask a live FAQ question..."
              aria-label="Search help articles"
              value={faqQuestion}
              onChange={(e) => setFaqQuestion(e.target.value)}
            />
            <button type="submit" className="submit-btn">Ask Live FAQ</button>
          </form>
          <p className="socket-status">Socket status: {connectionState}</p>
          {socketAnswer && <p className="socket-answer">{socketAnswer}</p>}
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={openFAQ === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-icon ${openFAQ === faq.id ? "open" : ""}`}>+</span>
                </button>
                {openFAQ === faq.id && (
                  <div id={`faq-answer-${faq.id}`} className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="help-contact">
          <h2>Still need help?</h2>
          <p>Use Contact Us or Feedback for the Firestore-backed support forms.</p>
          <button className="contact-btn">Contact Support</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpCenter;
