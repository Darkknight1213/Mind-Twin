# MindTwin – Gamified Mental Wellness Companion

**Your mental glow-up starts here ✨**

***

## Overview

MindTwin is a revolutionary, highly engaging mental health and wellness platform built for Gen Z. We merge AI, science, and Gen-Z style gamification to deliver story-driven, micro-interactive therapy journeys that feel like games—not clinical apps.

***

## Features

- 🌱 Interactive, dynamic learning paths: Personalized based on your check-ins and progress.
- 😁 Daily gamified “vibe check-ins” with emoji feedback and rewards.
- 🔥 Levels, XP, streaks, and badges to keep motivation high.
- 💬 AI-powered supportive chatbot—empathetic, modern, and fun to use.
- 🎮 Story-based, scenario-driven lessons designed in Gen-Z slang and vibe.
- 🏆 Weekly challenges, progress tracking, and leaderboards (optional).

***

## Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS, Framer Motion, Zustand
- **Backend:** FastAPI (Python), SQLite (for MVP; PostgreSQL for prod), REST APIs, JWT Auth
- **AI/ML:** OpenAI (for chatbot), Hugging Face (for mood/intent)
- **Infra (future):** AWS (RDS, S3, WAF, IAM), Docker, Render.com for MVP deployments

***

## Getting Started

1. **Clone the repo:**  
   `git clone https://github.com/your-org/MindTwin.git`

2. **Frontend:**
   - `cd frontend`
   - `npm install`
   - `npm run dev` (dev) or `npm run build && npm run start` (prod)

3. **Backend:**
   - `cd backend`
   - `python -m venv venv && source venv/bin/activate`
   - `pip install -r requirements.txt`
   - `uvicorn app.main:app --reload`

4. Environment variables:
   - Frontend: See `/frontend/.env.example`
   - Backend: See `/backend/.env.example`

***

## Security

- **MVP:** JWT-based user auth, bcrypt-hashed passwords, HTTPS enforced via hosting, minimal attack surface.
- **Scalable future:** AWS encryption at rest & in transit, IAM, WAF, Secret Manager, audit logs, and role-based access for production grade deployments.

***

## Contributing

We ❤️ collaboration!
- Fork + branch per feature/bugfix.
- PRs must pass linter/test checks.
- Open issues if you find bugs or have ideas.

***

## Team

- Ramitha | Backend/Infra
- Deepshika / Nabithra | AI/Content & Model
- Mohamed Riyaz Ahamed | Frontend, UI/UX Integration

***

## License

[MIT License](LICENSE)

***

**Made with caffeine, memes, and care for Gen Z.**

***

Feel free to add, remove, or tailor any info as needed for your repo.
