// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

// Validate required environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

requiredEnvVars.forEach(envVar => {
  if (!import.meta.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
  }
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

class FirebaseService {
  static instance;

  constructor() {
    if (FirebaseService.instance) {
      return FirebaseService.instance;
    }

    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);

    FirebaseService.instance = this;
  }

  async signup(name, username, email, password) {
    try {
      const res = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = res.user;

      try {
        await setDoc(doc(this.db, "users", user.uid), {
          uid: user.uid,
          name,
          username,
          authProvider: "local",
          email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }, { merge: true });
      } catch (firestoreError) {
        console.error("❌ Firestore user document save failed:", firestoreError);
        const permissionMessage = firestoreError.code === 'permission-denied'
          ? 'Account created, but profile data could not be saved due to database permissions.'
          : 'Account created, but profile data could not be saved.';
        toast.warning(permissionMessage);
      }

      return { success: true, user };
    } catch (error) {
      console.error("❌ Error signing up:", error);
      const errorMessages = {
        'auth/email-already-in-use': 'Email is already registered',
        'auth/weak-password': 'Password is too weak (min 6 characters)',
        'auth/invalid-email': 'Invalid email format',
        'auth/operation-not-allowed': 'Sign-up is not enabled for this project',
      };
      const message = errorMessages[error.code] || 'Sign up failed. Please check your details and try again.';
      toast.error(message);
      return { success: false, message };
    }
  }

  async login(email, password) {
    try {
      const res = await signInWithEmailAndPassword(this.auth, email, password);
      try {
        const profileRef = doc(this.db, "users", res.user.uid);
        const snapshot = await getDoc(profileRef);

        if (snapshot.exists()) {
          await updateDoc(profileRef, {
            lastLoginAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(profileRef, {
            uid: res.user.uid,
            email: res.user.email,
            authProvider: "local",
            lastLoginAt: serverTimestamp(),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }, { merge: true });
        }
      } catch (profileError) {
        console.error("âŒ Failed to sync login profile:", profileError);
      }
      return { success: true, user: res.user };
    } catch (error) {
      console.error("❌ Error logging in:", error);
      const errorMessages = {
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/invalid-email': 'Invalid email format',
        'auth/user-disabled': 'This account has been disabled',
        'auth/too-many-requests': 'Too many login attempts. Please try again later',
      };
      const message = errorMessages[error.code] || 'Login failed. Please try again.';
      toast.error(message);
      return { success: false, message };
    }
  }

  logout() {
    return signOut(this.auth);
  }
}

const firebaseService = new FirebaseService();
const auth = firebaseService.auth;
const db = firebaseService.db;

const signup = async (name, username, email, password) => {
  return firebaseService.signup(name, username, email, password);
};

const login = async (email, password) => {
  return firebaseService.login(email, password);
};

const logout = () => {
  return firebaseService.logout();
};

export { auth, db, signup, login, logout, firebaseService };

