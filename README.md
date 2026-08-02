# NextHire AI

An AI-powered mock interview preparation platform. Pick a role, difficulty, and interview type, get realistic interview questions generated on the fly, answer by typing or by voice, and get instant AI feedback with a score, correctness breakdown, and an ideal-answer example — all backed by real progress tracking across sessions.

**Live app:** [next-hire-ai-ashy.vercel.app](https://next-hire-ai-ashy.vercel.app)
**Backend API:** [nexthire-ai-backend-8xwm.onrender.com/api/health](https://nexthire-ai-backend-8xwm.onrender.com/api/health)

> Note: the backend is hosted on Render's free tier, so it spins down after inactivity — the first request after idle time can take 20–30 seconds to wake up.

---

## Features

- **AI-generated interview questions** — tailored to role, experience level, difficulty, and interview type using the Gemini API
- **Topic-focused practice** — the dashboard surfaces your weakest topics from past sessions; clicking one generates a fresh set of questions focused specifically on that topic
- **AI answer feedback** — each answer gets scored (0–10) with correctness notes, improvement suggestions, and an ideal-answer example
- **Voice-to-text answers** — answer questions by speaking instead of typing, using the browser's native Speech Recognition API (free, no external service)
- **Session history** — view, revisit, and delete any past interview session, not just the most recent ones
- **Bookmarks** — save questions for later review, with a direct link back to the exact session and question they came from (auto-scrolls and highlights it)
- **Dashboard analytics** — lifetime average score, recent session timeline, and personalized weak-topic recommendations
- **Auth** — JWT-based (access + refresh tokens), email verification via OTP, forgot/reset password flow over SMTP
- **Profile management** — profile picture upload via Cloudinary

## Tech Stack

**Frontend**
React 19 · Vite · Tailwind CSS v4 (CSS-native `@theme` tokens) · React Router · Axios · TanStack Query · React Hook Form · Framer Motion · GSAP + Lenis (landing page) · Radix UI primitives · Recharts

**Backend**
Node.js · Express · MongoDB + Mongoose · JWT (access + refresh) · bcrypt · Cloudinary · Nodemailer (Gmail SMTP) · Helmet · express-rate-limit · express-mongo-sanitize · express-validator

**AI**
Google Gemini API (`gemini-flash-latest` — aliased rather than a pinned version, to avoid future model deprecation)

**Deployment**
Frontend on Vercel · Backend on Render · Database on MongoDB Atlas

## Architecture Notes

A few decisions worth calling out:

- **Header-based JWT, not cookies** — access and refresh tokens are sent via `Authorization: Bearer` and stored client-side, avoiding cross-domain cookie complexity (`sameSite`/`secure`) across the Vercel and Render split.
- **Multi-origin CORS** — the backend reads `CLIENT_URL` as a comma-separated list, so local dev and the deployed frontend can both hit the API without swapping env vars.
- **SPA routing on Vercel** — a `vercel.json` rewrite rule ensures direct URL hits (e.g. a hard refresh on `/dashboard`) serve `index.html` and let React Router handle routing, instead of returning Vercel's generic 404.
- **Graceful error handling** — every data-fetching page checks for error/not-found states explicitly (e.g. a deleted or invalid session shows a proper message, not a crash), and an app-wide Error Boundary catches any unexpected render error with a friendly fallback instead of a blank white screen.
- **Optional topic-focus generation** — the AI prompt accepts an optional `focusTopic`; when present, all generated questions are locked to that topic, when absent, generation behaves exactly as a normal varied-topic session.

## Project Structure

```
NextHire-AI/
├── backend/
│   ├── config/           # DB connection, Cloudinary config
│   ├── controllers/      # Route handlers (auth, profile, interviews, questions, feedback)
│   ├── middleware/       # Auth, error handling, validation
│   ├── models/           # Mongoose schemas (User, InterviewSession, Question)
│   ├── routes/
│   ├── services/         # AI service (Gemini prompt building)
│   ├── utils/            # Token generation, etc.
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/        # (currently empty — placeholder for static images/icons)
    │   ├── components/    # Shared UI primitives
    │   ├── context/       # AuthContext
    │   ├── features/      # Feature-based folders: auth, dashboard, interviews, bookmarks, profile
    │   ├── hooks/         # App-wide hooks not tied to a feature (e.g. useLenis)
    │   ├── layouts/       # AppLayout, Sidebar, Topbar
    │   ├── lib/           # Helpers (error messages, token storage)
    │   ├── pages/         # Standalone pages (LandingPage, NotFoundPage)
    │   ├── services/      # Axios instance + API service layer
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── vercel.json        # SPA rewrite rule
```

## Local Setup

**Backend**
```bash
cd backend
npm install
cp .env.example .env   # fill in your MongoDB URI, JWT secrets, Cloudinary, Gemini, and SMTP credentials
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_BASE_URL=http://localhost:5000/api
npm run dev
```

See `backend/.env.example` for the full list of required environment variables.

## Deployment

- **Backend (Render):** root directory `backend`, build command `npm install`, start command `npm start`. Env vars set in the Render dashboard, including `CLIENT_URL` as a comma-separated list of allowed origins.
- **Frontend (Vercel):** root directory `frontend`, framework auto-detected as Vite. `VITE_API_BASE_URL` set to the live Render backend URL.
- **Database:** MongoDB Atlas, with network access configured to allow Render's connections.

Both platforms auto-deploy on every push to `main`.

## Known Limitations

- Voice-to-text relies on the browser's native Speech Recognition API, which is well-supported in Chrome/Edge but unavailable in Firefox and inconsistent in Safari. The app detects support and simply hides the mic button where unavailable — typing remains the primary input method everywhere.
- Topic-focused generation doesn't validate that the selected interview type is a sensible match for the focus topic (e.g. picking "SQL" as the interview type while focusing on a JS-specific topic like "Closures"). Since topics are free-form strings generated by the AI rather than a fixed enum, and some topics genuinely span multiple languages, this was a deliberate scope decision rather than an oversight.

## Author

Built by [Sanket](https://github.com/Sanket-825) — a portfolio project built end-to-end (backend, frontend, deployment) to demonstrate full-stack MERN development.