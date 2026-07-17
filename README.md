# NextHire-AI Preparation Platform

A full-stack MERN application that helps users prepare for technical interviews with AI-generated questions, answer tracking, and progress analytics.

## Status
🚧 In active development — built in phases.

- [x] Phase 1: Backend foundation (auth, models, security middleware, Cloudinary)
- [ ] Phase 2: Interview + Question APIs, AI question generation, feedback scoring
- [ ] Phase 3: Frontend foundation (auth, layouts, routing)
- [ ] Phase 4: Frontend pages (dashboard, interview session, bookmarks, profile)
- [ ] Phase 5: Deployment (Vercel + Render + MongoDB Atlas)

## Tech Stack
**Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios, Recharts
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary
**AI:** Google Gemini API

## Setup
See `backend/.env.example` for required environment variables.

```bash
cd backend
npm install
cp .env.example .env   # then fill in your credentials
npm run dev
```
