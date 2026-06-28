# Viva Demo Checklist

## Before the demo

- Open the project folder on the desktop with your name and registration number.
- Keep the recorded walkthrough video ready.
- Keep the live hosting URL ready.
- Start the FAQ socket server if you want to demo live FAQ responses:
  - `npm run faq-socket`

## Demo order

1. Login and signup flow
2. Validation rules
3. Firestore CRUD on Contact Us
4. Firestore CRUD on Feedback
5. Watchlist CRUD on My List
6. Live FAQ socket demo in Help Center
7. Worker-based multitasking in My List
8. Production build and deployed link
9. Test case document

## Viva talking points

- Explain how Firebase Auth stores users and how Firestore stores profile and form data.
- Show the password, username, name, and email validation rules.
- Show create, read, update, and delete on at least one Firestore-backed form.
- Explain why the FAQ section uses a WebSocket server.
- Explain why the watchlist analytics worker improves UI responsiveness.
- Mention that tests pass with `npm test`.
- Mention that the app builds with `npm run build`.

## Files to show

- [src/firebase.js](./src/firebase.js)
- [src/services/firestoreService.js](./src/services/firestoreService.js)
- [src/pages/Login/Login.jsx](./src/pages/Login/Login.jsx)
- [src/pages/ContactUs/ContactUs.jsx](./src/pages/ContactUs/ContactUs.jsx)
- [src/pages/Feedback/Feedback.jsx](./src/pages/Feedback/Feedback.jsx)
- [src/pages/MyList/MyList.jsx](./src/pages/MyList/MyList.jsx)
- [src/pages/HelpCenter/HelpCenter.jsx](./src/pages/HelpCenter/HelpCenter.jsx)
- [src/workers/watchlistAnalyticsWorker.js](./src/workers/watchlistAnalyticsWorker.js)
