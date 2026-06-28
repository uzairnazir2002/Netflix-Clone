import React, { useCallback, useEffect, useState } from "react";
import "./Feedback.css";
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

const emptyFeedback = {
  name: "",
  email: "",
  rating: "5",
  message: "",
};

const Feedback = () => {
  const [formData, setFormData] = useState(emptyFeedback);
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [userId, setUserId] = useState(auth.currentUser?.uid || "guest");

  const loadFeedback = useCallback(async () => {
    try {
      const data = await firestoreService.getFeedback(userId);
      setEntries(data);
      const nextDrafts = {};
      data.forEach((item) => {
        nextDrafts[item.id] = {
          rating: String(item.rating ?? 5),
          message: item.message || "",
        };
      });
      setDrafts(nextDrafts);
    } catch (error) {
      console.error("Failed to load feedback:", error);
      toast.error("Could not load feedback records.");
    }
  }, [userId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || "guest");
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      toast.error("Please sign in first so feedback can be stored in Firestore.");
      return;
    }

    if (!isRequiredText(formData.name) || !isRequiredText(formData.email) || !isRequiredText(formData.message)) {
      toast.error("Fill all required feedback fields.");
      return;
    }

    if (!isAlphabeticName(formData.name)) {
      toast.error("Name must contain alphabets only.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Enter a valid email address.");
      return;
    }

    try {
      await firestoreService.createFeedback(formData);
      toast.success("Feedback saved.");
      setFormData(emptyFeedback);
      await loadFeedback();
    } catch (error) {
      console.error("Feedback save failed:", error);
      toast.error("Could not save feedback.");
    }
  };

  const saveEdit = async (entryId) => {
    try {
      const draft = drafts[entryId];
      await firestoreService.updateFeedback(entryId, {
        rating: Number(draft.rating),
        message: draft.message,
      });
      toast.success("Feedback updated.");
      setEditingId(null);
      await loadFeedback();
    } catch (error) {
      console.error("Feedback update failed:", error);
      toast.error("Could not update feedback.");
    }
  };

  const deleteEntry = async (entryId) => {
    try {
      await firestoreService.deleteFeedback(entryId);
      toast.success("Feedback deleted.");
      await loadFeedback();
    } catch (error) {
      console.error("Feedback delete failed:", error);
      toast.error("Could not delete feedback.");
    }
  };

  return (
    <div className="feedback-page">
      <Navbar />
      <div className="feedback-container">
        <div className="feedback-header">
          <h1>Feedback</h1>
          <p>Submit, edit, and manage your feedback records from Firestore.</p>
        </div>

        <div className="feedback-grid">
          <div className="feedback-form-card">
            <h2>Leave Feedback</h2>
            <form onSubmit={handleSubmit} className="feedback-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
              <select name="rating" value={formData.rating} onChange={handleChange}>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Bad</option>
              </select>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you think..."
                rows="5"
                required
              />
              <button type="submit" className="submit-btn">Save Feedback</button>
            </form>
          </div>

          <div className="feedback-list-card">
            <h2>Saved Feedback</h2>
            {entries.length === 0 ? (
              <p>No feedback submitted yet.</p>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="feedback-entry">
                  {editingId === entry.id ? (
                    <>
                      <select
                        value={drafts[entry.id]?.rating || "5"}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [entry.id]: { ...prev[entry.id], rating: e.target.value },
                          }))
                        }
                      >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Good</option>
                        <option value="3">3 - Average</option>
                        <option value="2">2 - Poor</option>
                        <option value="1">1 - Bad</option>
                      </select>
                      <textarea
                        rows="4"
                        value={drafts[entry.id]?.message || ""}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [entry.id]: { ...prev[entry.id], message: e.target.value },
                          }))
                        }
                      />
                      <div className="feedback-actions">
                        <button type="button" className="submit-btn" onClick={() => saveEdit(entry.id)}>
                          Save
                        </button>
                        <button type="button" className="remove-btn" onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3>{entry.name}</h3>
                      <p><strong>Email:</strong> {entry.email}</p>
                      <p><strong>Rating:</strong> {entry.rating}/5</p>
                      <p>{entry.message}</p>
                      <div className="feedback-actions">
                        <button type="button" className="submit-btn" onClick={() => setEditingId(entry.id)}>
                          Edit
                        </button>
                        <button type="button" className="remove-btn" onClick={() => deleteEntry(entry.id)}>
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
