import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./MyList.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { firestoreService } from "../../services/firestoreService";

const statusOptions = ["Plan to Watch", "Watching", "Completed"];

const MyList = ({ user }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState({
    total: 0,
    statusCounts: {},
    averageTitleLength: 0,
  });
  const [drafts, setDrafts] = useState({});
  const workerRef = useRef(null);

  const uid = user?.uid || auth.currentUser?.uid;

  const loadWatchlist = useCallback(async () => {
    if (!uid) return;

    setLoading(true);
    try {
      const data = await firestoreService.getWatchlistItems(uid);
      setWatchlist(data);
      const nextDrafts = {};
      data.forEach((item) => {
        nextDrafts[item.movieId] = {
          status: item.status || "Plan to Watch",
          notes: item.notes || "",
        };
      });
      setDrafts(nextDrafts);
    } catch (error) {
      console.error("Error loading watchlist:", error);
      toast.error("Failed to load your list");
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    loadWatchlist();
  }, [loadWatchlist]);

  useEffect(() => {
    if (typeof Worker === "undefined") return undefined;

    const worker = new Worker(
      new URL("../../workers/watchlistAnalyticsWorker.js", import.meta.url),
      { type: "module" },
    );

    workerRef.current = worker;
    worker.onmessage = (event) => setAnalytics(event.data);
    worker.onerror = (error) => {
      console.error("Watchlist worker error:", error);
    };

    return () => worker.terminate();
  }, []);

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ items: watchlist });
    }
  }, [watchlist]);

  const removeFromList = async (movieId) => {
    if (!uid) return;

    try {
      await firestoreService.deleteWatchlistItem(uid, movieId);
      toast.success("Removed from your list");
      await loadWatchlist();
    } catch (error) {
      console.error("Failed to delete watchlist item:", error);
      toast.error("Could not remove item");
    }
  };

  const addDemoItem = async () => {
    if (!uid) return;
    try {
      await firestoreService.addWatchlistItem(uid, {
        id: 999999,
        title: "Demo Title",
        posterPath: "",
        releaseDate: new Date().getFullYear().toString(),
        mediaType: "movie",
        status: "Plan to Watch",
        notes: "Sample item created from the app.",
      });
      toast.success("Demo item added.");
      await loadWatchlist();
    } catch (error) {
      console.error("Failed to add demo item:", error);
      toast.error("Could not add demo item.");
    }
  };

  const saveItem = async (movieId) => {
    if (!uid) return;

    try {
      const draft = drafts[movieId];
      await firestoreService.updateWatchlistItem(uid, movieId, {
        status: draft.status,
        notes: draft.notes,
      });
      toast.success("Watchlist item updated");
      await loadWatchlist();
    } catch (error) {
      console.error("Failed to update watchlist item:", error);
      toast.error("Could not update item");
    }
  };

  const stats = useMemo(() => {
    return [
      { label: "Saved titles", value: analytics.total || watchlist.length },
      { label: "Watching", value: analytics.statusCounts?.Watching || 0 },
      { label: "Completed", value: analytics.statusCounts?.Completed || 0 },
    ];
  }, [analytics, watchlist.length]);

  return (
    <div className="mylist">
      <Navbar />
      <div className="mylist-container">
        <h1 className="page-title">My List</h1>

        <div className="watchlist-stats">
          {stats.map((item) => (
            <div key={item.label} className="stat-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
          <button className="submit-btn" onClick={addDemoItem} type="button">
            Add Demo Item
          </button>
        </div>

        {loading && <p className="loading-message">Loading your list...</p>}

        {!loading && watchlist.length === 0 ? (
          <div className="empty-list">
            <p>Your list is empty</p>
            <p>Add movies and shows to keep track of what you want to watch</p>
          </div>
        ) : (
          <div className="watchlist-grid">
            {watchlist.map((item) => (
              <div key={item.movieId} className="watchlist-item">
                <img
                  src={item.posterPath ? `https://image.tmdb.org/t/p/w342${item.posterPath}` : "/placeholder-image.png"}
                  alt={item.title}
                  className="watchlist-poster"
                />
                <div className="watchlist-info">
                  <h3>{item.title}</h3>
                  <p className="release-date">{item.releaseDate}</p>

                  <label htmlFor={`status-${item.movieId}`}>Status</label>
                  <select
                    id={`status-${item.movieId}`}
                    value={drafts[item.movieId]?.status || "Plan to Watch"}
                    onChange={(e) =>
                      setDrafts((prev) => ({
                        ...prev,
                        [item.movieId]: {
                          ...prev[item.movieId],
                          status: e.target.value,
                        },
                      }))
                    }
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label htmlFor={`notes-${item.movieId}`}>Notes</label>
                  <textarea
                    id={`notes-${item.movieId}`}
                    rows="3"
                    value={drafts[item.movieId]?.notes || ""}
                    onChange={(e) =>
                      setDrafts((prev) => ({
                        ...prev,
                        [item.movieId]: {
                          ...prev[item.movieId],
                          notes: e.target.value,
                        },
                      }))
                    }
                    placeholder="Optional notes"
                  />

                  <div className="watchlist-actions">
                    <button className="submit-btn" onClick={() => saveItem(item.movieId)} type="button">
                      Save
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromList(item.movieId)}
                      aria-label={`Remove ${item.title} from list`}
                      type="button"
                    >
                      Remove from My List
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyList;
