import React, { useCallback, useEffect, useState } from "react";
import "./ContactUs.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { toast } from "react-toastify";
import { firestoreService } from "../../services/firestoreService";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  isAlphabeticName,
  isValidEmail,
  isRequiredText,
} from "../../utils/validation";

const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactUs = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [userId, setUserId] = useState(auth.currentUser?.uid || "guest");

  const loadMessages = useCallback(async () => {
    try {
      const data = await firestoreService.getContactMessages(userId);
      setMessages(data);
      const nextDrafts = {};
      data.forEach((item) => {
        nextDrafts[item.id] = {
          subject: item.subject || "",
          message: item.message || "",
        };
      });
      setDrafts(nextDrafts);
    } catch (error) {
      console.error("Failed to load messages:", error);
      toast.error("Could not load your contact messages.");
    }
  }, [userId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || "guest");
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      toast.error("Please sign in first so the message can be stored in Firestore.");
      return;
    }

    if (!isRequiredText(formData.name) || !isRequiredText(formData.email) || !isRequiredText(formData.message)) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isAlphabeticName(formData.name)) {
      toast.error("Name must contain alphabets only");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await firestoreService.logContactMessage(formData);
      toast.success("Message saved to the database.");
      setFormData(emptyForm);
      await loadMessages();
    } catch (error) {
      console.error("Contact submission failed:", error);
      toast.error("Unable to save message right now.");
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = async (messageId) => {
    try {
      const current = messages.find((item) => item.id === messageId);
      const draft = drafts[messageId];
      await firestoreService.updateContactMessage(messageId, {
        subject: draft.subject,
        message: draft.message,
        name: current.name,
        email: current.email,
      });
      toast.success("Message updated.");
      setEditingId(null);
      await loadMessages();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Could not update the message.");
    }
  };

  const removeMessage = async (messageId) => {
    try {
      await firestoreService.deleteContactMessage(messageId);
      toast.success("Message deleted.");
      await loadMessages();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Could not delete the message.");
    }
  };

  return (
    <div className="contact-us">
      <Navbar />
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Your submissions are stored in Firestore.</p>
        </div>

        <div className="contact-content">
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Saving..." : "Save Message"}
              </button>
            </form>
          </div>

          <div className="contact-info-section">
            <h2>Your Submitted Messages</h2>
            {messages.length === 0 ? (
              <div className="contact-info-card">
                <p>No saved messages yet.</p>
                <small>Submit a message to test create, read, update, and delete.</small>
              </div>
            ) : (
              messages.map((item) => (
                <div key={item.id} className="contact-info-card">
                  {editingId === item.id ? (
                    <>
                      <label htmlFor={`subject-${item.id}`}>Subject</label>
                      <input
                        id={`subject-${item.id}`}
                        type="text"
                        value={drafts[item.id]?.subject || ""}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [item.id]: { ...prev[item.id], subject: e.target.value },
                          }))
                        }
                      />
                      <label htmlFor={`message-${item.id}`}>Message</label>
                      <textarea
                        id={`message-${item.id}`}
                        rows="4"
                        value={drafts[item.id]?.message || ""}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [item.id]: { ...prev[item.id], message: e.target.value },
                          }))
                        }
                      />
                      <div className="contact-actions">
                        <button type="button" className="submit-btn" onClick={() => saveEdit(item.id)}>
                          Save
                        </button>
                        <button type="button" className="remove-btn" onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3>{item.subject || "No subject"}</h3>
                      <p><strong>Name:</strong> {item.name}</p>
                      <p><strong>Email:</strong> {item.email}</p>
                      <p>{item.message}</p>
                      <div className="contact-actions">
                        <button type="button" className="submit-btn" onClick={() => setEditingId(item.id)}>
                          Edit
                        </button>
                        <button type="button" className="remove-btn" onClick={() => removeMessage(item.id)}>
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}

            <div className="contact-info-card">
              <h3>Other Ways to Reach Us</h3>
              <p>
                <a href="mailto:support@netflixclone.com">support@netflixclone.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
