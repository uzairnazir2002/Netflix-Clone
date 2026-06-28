# Netflix Clone

A modern, fully-functional Netflix clone built with React, Vite, Firebase Authentication, and The Movie Database (TMDB) API. Features a responsive design with movie browsing, authentication, and video playback capabilities.

## 🚀 Features

- **User Authentication**: Secure sign-up and login with Firebase
- **Protected Routes**: Only authenticated users can access content
- **Movie & TV Show Discovery**: Browse by categories and genres
- **Multiple Pages**: Home, TV Shows, Movies, New & Popular, My List, Browse by Languages
- **Video Player**: Watch trailers using YouTube embeds
- **Footer Pages**: Help Center, Contact Us, Jobs, Terms of Use, Privacy Policy, Cookie Preferences
- **Feedback Form**: Firestore-backed feedback CRUD page
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Data**: Fetches movie data from TMDB API
- **Smooth Navigation**: Horizontal scrolling for movie cards with mouse wheel support
- **My List Feature**: Save favorite movies and shows
- **Live FAQ Socket**: WebSocket-powered question/answer demo in Help Center
- **Language Browse**: Filter content by language
- **Error Handling**: User-friendly error messages and loading states
- **Accessibility**: Full keyboard navigation and ARIA labels

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm or yarn
- A Firebase project setup
- A TMDB API key

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Netflix-Clone
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

**CRITICAL SECURITY STEP**: Never commit `.env.local` file!

1. Copy the example file:
```bash
cp .env.local.example .env.local
```

2. Open `.env.local` and add your credentials:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# TMDB API Configuration
VITE_TMDB_API_KEY=your_tmdb_bearer_token
```

### 4. How to Get Your Credentials

#### Firebase Setup:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings → Service Accounts → Web
4. Copy all the configuration values into `.env.local`
5. Enable Email/Password authentication in Firebase Console → Authentication

#### TMDB API Key:
1. Visit [TMDB API](https://www.themoviedb.org/settings/api)
2. Create an account if needed
3. Generate an API key
4. Copy the Bearer token into `VITE_TMDB_API_KEY`

### 5. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run faq-socket` - Start the FAQ WebSocket server locally

## 🏗️ Project Structure

```
src/
├── assets/              # Images and static files
├── components/          # Reusable components
│   ├── Footer/
│   ├── Navbar/
│   ├── ProtectedRoute/  # Route protection HOC
│   └── TitleCards/
├── config/             # Configuration files
│   └── tmdbConfig.js   # TMDB API utilities
├── pages/              # Page components
│   ├── Home/
│   ├── Login/
│   ├── Player/
│   ├── TVShows/        # ✨ TV Shows page
│   ├── Movies/         # ✨ Movies page
│   ├── NewPopular/     # ✨ New & Popular page
│   ├── MyList/         # ✨ My List page
│   └── BrowseLanguages/ # ✨ Browse by Languages page
├── App.jsx             # Main app component with routing
├── firebase.js         # Firebase configuration & auth functions
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🔐 Security Improvements Implemented

✅ **API Keys in Environment Variables** - All sensitive credentials moved to `.env.local`
✅ **Protected Routes** - Authentication required for home and player pages
✅ **HTTPS/Secure Context** - TMDB and Firebase use secure connections
✅ **Input Validation** - Email and password validation on signup/login
✅ **Error Messages** - User-friendly error handling without exposing system details
✅ **.gitignore Updated** - Prevents accidental commit of `.env.local`

## 🐛 Recent Fixes & Improvements

- **Fixed Memory Leak**: Event listeners properly cleaned up in TitleCards
- **Enhanced Navigation**: Added missing root route and protected routes
- **Improved UX**: Users stay logged in after signup (no forced re-login)
- **Better Error Handling**: Loading states and error messages for API calls
- **Accessibility**: Added ARIA labels, keyboard navigation, and semantic HTML
- **Code Quality**: Fixed variable naming, added PropTypes validation
- **Responsive Images**: Implemented srcset for optimized image loading
- **Logout Confirmation**: Added confirmation dialog before signing out
- **Dependent Updates**: TitleCards now refetch when category changes

## 🎨 Technologies Used

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router DOM 7.8.1
- **Authentication**: Firebase 12.1.0
- **Notifications**: React Toastify 11.0.5
- **Styling**: CSS3
- **API**: TMDB REST API

## 📱 Responsive Design

The app is fully responsive with breakpoints for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)

## ⚡ Performance Optimizations

- **Lazy Loading**: Images load only when visible
- **Responsive Images**: Multiple image sizes for different screen widths
- **Code Splitting**: Components can be split for better load times
- **API Caching**: Implemented error handling to prevent duplicate requests

## 🔍 Testing

Current status: unit tests are included for validation helpers and TMDB adapters.

Run the test suite with:
```bash
npm test
```

The test setup uses Vitest with `jsdom` and `@testing-library/jest-dom`.

## 🚀 Deployment

This is a single-page React app, so deployments need an SPA rewrite rule.

- Vercel: use the included [`vercel.json`](./vercel.json)
- Local production preview: `npm run build` then `npm run preview`
- FAQ socket demo: run `npm run faq-socket` in a second terminal before opening the Help Center

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💡 Future Enhancements

- [ ] User watchlist functionality ✅ **MyList page added**
- [ ] Footer pages ✅ **All 6 footer pages created**
- [ ] Search and filtering
- [ ] User reviews and ratings
- [ ] Download functionality
- [ ] Multiple user profiles
- [ ] Recommendation engine
- [ ] Dark/Light theme toggle
- [ ] Offline mode support
- [ ] Advanced filtering by language

## 🆘 Troubleshooting

### Issue: "TMDB API key is not configured"
**Solution**: Make sure `.env.local` exists and `VITE_TMDB_API_KEY` is set

### Issue: Firebase authentication not working
**Solution**: Verify Firebase credentials in `.env.local` and ensure Email/Password auth is enabled in Firebase Console

### Issue: Images not loading
**Solution**: Check internet connection and TMDB API status

### Issue: Port 5173 already in use
**Solution**: Run `npm run dev -- --port 3000` to use a different port

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Last Updated**: January 26, 2026
**Status**: Production Ready ✅
