import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const getCurrentUser = () => auth.currentUser;

const mapDoc = (snapshot) => ({
  id: snapshot.id,
  ...snapshot.data(),
});

const withTimestamps = (payload, created = false) => ({
  ...payload,
  updatedAt: serverTimestamp(),
  ...(created ? { createdAt: serverTimestamp() } : {}),
});

class FirestoreService {
  async ensureUserProfile(profile) {
    if (!profile?.uid) {
      throw new Error("User profile requires a uid");
    }

    const ref = doc(db, "users", profile.uid);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      await setDoc(ref, withTimestamps(profile, true));
      return { id: profile.uid, ...profile };
    }

    await updateDoc(ref, withTimestamps(profile));
    return { id: profile.uid, ...profile };
  }

  async getUserProfile(uid = getCurrentUser()?.uid) {
    if (!uid) return null;
    const snapshot = await getDoc(doc(db, "users", uid));
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  }

  async updateUserProfile(uid = getCurrentUser()?.uid, updates = {}) {
    if (!uid) throw new Error("Cannot update user profile without a uid");
    await updateDoc(doc(db, "users", uid), withTimestamps(updates));
  }

  async logContactMessage(message) {
    const user = getCurrentUser();
    const payload = {
      userId: user?.uid || "guest",
      userEmail: user?.email || message.email,
      name: message.name,
      email: message.email,
      subject: message.subject || "",
      message: message.message,
      status: message.status || "Open",
    };

    const ref = await addDoc(collection(db, "contactMessages"), withTimestamps(payload, true));
    return { id: ref.id, ...payload };
  }

  async getContactMessages(uid = getCurrentUser()?.uid) {
    if (!uid) return [];
    const q = query(collection(db, "contactMessages"), where("userId", "==", uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(mapDoc).sort(
      (a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      },
    );
  }

  async updateContactMessage(id, updates) {
    await updateDoc(doc(db, "contactMessages", id), withTimestamps(updates));
  }

  async deleteContactMessage(id) {
    await deleteDoc(doc(db, "contactMessages", id));
  }

  async createFeedback(feedback) {
    const user = getCurrentUser();
    const payload = {
      userId: user?.uid || "guest",
      userEmail: user?.email || feedback.email,
      name: feedback.name,
      email: feedback.email,
      rating: Number(feedback.rating),
      message: feedback.message,
      status: feedback.status || "Open",
    };

    const ref = await addDoc(collection(db, "feedback"), withTimestamps(payload, true));
    return { id: ref.id, ...payload };
  }

  async getFeedback(uid = getCurrentUser()?.uid) {
    if (!uid) return [];
    const q = query(collection(db, "feedback"), where("userId", "==", uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(mapDoc).sort(
      (a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      },
    );
  }

  async updateFeedback(id, updates) {
    await updateDoc(doc(db, "feedback", id), withTimestamps(updates));
  }

  async deleteFeedback(id) {
    await deleteDoc(doc(db, "feedback", id));
  }

  watchlistDocId(userId, movieId) {
    return `${userId}_${movieId}`;
  }

  async addWatchlistItem(userId, item) {
    const watchId = this.watchlistDocId(userId, item.id);
    const payload = {
      userId,
      movieId: item.id,
      title: item.title,
      posterPath: item.posterPath || item.imagePath || item.backdropPath || "",
      releaseDate: item.releaseDate || "Unknown",
      mediaType: item.mediaType || "movie",
      status: item.status || "Plan to Watch",
      notes: item.notes || "",
    };

    await setDoc(doc(db, "watchlists", watchId), withTimestamps(payload, true), { merge: true });
    return { id: watchId, ...payload };
  }

  async getWatchlistItems(userId = getCurrentUser()?.uid) {
    if (!userId) return [];
    const q = query(collection(db, "watchlists"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(mapDoc).sort(
      (a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      },
    );
  }

  async updateWatchlistItem(userId, movieId, updates) {
    const watchId = this.watchlistDocId(userId, movieId);
    await updateDoc(doc(db, "watchlists", watchId), withTimestamps(updates));
  }

  async deleteWatchlistItem(userId, movieId) {
    const watchId = this.watchlistDocId(userId, movieId);
    await deleteDoc(doc(db, "watchlists", watchId));
  }
}

export const firestoreService = new FirestoreService();
