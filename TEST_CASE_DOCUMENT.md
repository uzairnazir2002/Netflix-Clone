# Netflix Clone Test Case Document

Project: Netflix Clone
Course/Lab: Final Project Evaluation
Date: 2026-06-29

## 1. Document Scope

This document covers functional test cases for the implemented project features, including authentication, database CRUD, validation, FAQ socket communication, and watchlist multitasking behavior.

## 2. Test Environment

- Frontend: React 19 + Vite
- Backend Services: Firebase Auth, Firestore, WebSocket FAQ server
- Browser: Chrome/Edge
- Build Command: `npm run build`

## 3. Test Case Summary

| ID | Module | Test Scenario | Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-01 | Signup | Create a new user with valid data | Open Login > Sign Up, enter valid name, username, email, password | Account created and redirected to home | Pass | Pass |
| TC-02 | Signup Validation | Enter invalid email | Open Sign Up, use invalid email format | Validation message shown | Pass | Pass |
| TC-03 | Signup Validation | Enter weak password | Open Sign Up, use password without uppercase/lowercase/number/special char | Validation message shown | Pass | Pass |
| TC-04 | Signup Validation | Enter name with digits | Open Sign Up, use name like `Ali123` | Validation message shown | Pass | Pass |
| TC-05 | Login | Sign in with valid credentials | Open Login, enter registered email/password | User logs in successfully | Pass | Pass |
| TC-06 | Login | Sign in with wrong password | Open Login, enter invalid password | Error message shown | Pass | Pass |
| TC-07 | Firestore CRUD | Save contact message | Open Contact Us, submit valid form | Message saved in Firestore | Pass | Pass |
| TC-08 | Firestore CRUD | View contact messages | Open Contact Us after submission | Saved messages are listed | Pass | Pass |
| TC-09 | Firestore CRUD | Update contact message | Edit a saved contact message and save | Updated data stored in Firestore | Pass | Pass |
| TC-10 | Firestore CRUD | Delete contact message | Delete a saved contact message | Record removed from Firestore | Pass | Pass |
| TC-11 | Firestore CRUD | Save feedback | Open Feedback page, submit valid feedback | Feedback saved in Firestore | Pass | Pass |
| TC-12 | Firestore CRUD | Edit feedback | Edit saved feedback and save | Updated feedback stored | Pass | Pass |
| TC-13 | Firestore CRUD | Delete feedback | Delete a feedback entry | Record removed | Pass | Pass |
| TC-14 | Watchlist CRUD | Add item to My List | Click Add to My List on a title card | Item appears in Firestore watchlist | Pass | Pass |
| TC-15 | Watchlist CRUD | Update watchlist item | Change status/notes and save | Changes stored in Firestore | Pass | Pass |
| TC-16 | Watchlist CRUD | Remove watchlist item | Click Remove from My List | Item deleted from Firestore | Pass | Pass |
| TC-17 | FAQ Socket | Ask a live FAQ question | Open Help Center and submit a live question | Socket returns a live response | Pass | Pass |
| TC-18 | FAQ UI | Toggle FAQ answers | Click FAQ questions in Help Center | Answer expands/collapses | Pass | Pass |
| TC-19 | Worker | Load watchlist analytics | Open My List with items saved | Worker calculates stats without blocking UI | Pass | Pass |
| TC-20 | Routing | Access protected route when logged out | Visit `/home` while logged out | Redirect to login page | Pass | Pass |
| TC-21 | Build | Production build | Run `npm run build` | Build completes successfully | Pass | Pass |
| TC-22 | Tests | Run automated tests | Run `npm test` | All tests pass | Pass | Pass |

## 4. Notes

- Firestore operations depend on valid Firebase environment variables and database permissions.
- Socket FAQ requires the FAQ server to be running with `npm run faq-socket`.
- Watchlist analytics require browser support for Web Workers.

## 5. Conclusion

The project satisfies the implemented functional checks for login, validation, Firestore CRUD, FAQ socket interaction, multitasking, and production build readiness.
