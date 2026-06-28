// App.jsx
import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import TVShows from './pages/TVShows/TVShows'
import Movies from './pages/Movies/Movies'
import NewPopular from './pages/NewPopular/NewPopular'
import MyList from './pages/MyList/MyList'
import BrowseLanguages from './pages/BrowseLanguages/BrowseLanguages'
import HelpCenter from './pages/HelpCenter/HelpCenter'
import TermsOfUse from './pages/TermsOfUse/TermsOfUse'
import Privacy from './pages/Privacy/Privacy'
import CookiePreferences from './pages/CookiePreferences/CookiePreferences'
import ContactUs from './pages/ContactUs/ContactUs'
import Feedback from './pages/Feedback/Feedback'
import SearchResults from './pages/SearchResults/SearchResults'
import Jobs from './pages/Jobs/Jobs'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        console.log("✅ Logged In:", currentUser.email);
      } else {
        console.log("🚪 Logged Out.");
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff'
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />
        <Route 
          path="/player/:id" 
          element={
            <ProtectedRoute user={user}>
              <Player />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tvshows" 
          element={
            <ProtectedRoute user={user}>
              <TVShows />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/movies" 
          element={
            <ProtectedRoute user={user}>
              <Movies />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/new-popular" 
          element={
            <ProtectedRoute user={user}>
              <NewPopular />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mylist" 
          element={
            <ProtectedRoute user={user}>
              <MyList user={user} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/browse-languages" 
          element={
            <ProtectedRoute user={user}>
              <BrowseLanguages />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/search" 
          element={
            <ProtectedRoute user={user}>
              <SearchResults />
            </ProtectedRoute>
          } 
        />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookie-preferences" element={<CookiePreferences />} />
        <Route 
          path="/contact-us" 
          element={
            <ProtectedRoute user={user}>
              <ContactUs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/feedback" 
          element={
            <ProtectedRoute user={user}>
              <Feedback />
            </ProtectedRoute>
          } 
        />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </div>
  )
}

export default App;
