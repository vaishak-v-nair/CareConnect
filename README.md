## CareConnect
AI-powered healthcare intake and volunteer coordination system built for NGOs.

CareConnect is a concept-level web application designed to demonstrate how structured data collection and AI-assisted triage can improve healthcare request handling efficiency.

---

## Live Demo

🔗 [https://YOUR-VERCEL-URL.vercel.app](https://your-vercel-url.vercel.app/)

(Add after deployment)

---

## Overview

NGOs handling healthcare assistance frequently receive unstructured requests via calls or messages. Manual triage slows response time and increases the risk of missing urgent cases.

CareConnect introduces:

- Structured patient intake
- AI-generated case summaries
- Automated urgency classification
- Volunteer registration management
- Real-time admin dashboard

The goal is clarity, usability, and intelligent prioritization — not feature overload.

---

## Core Features

### Patient Support Intake

- Structured validated form
- Self-declared urgency
- AI-generated summary
- AI-based urgency prediction
- Category tagging
- Firestore persistence

### Volunteer Registration

- Skills tracking
- Availability tracking
- Real-time database updates
- Success feedback with animation

### Admin Dashboard

- Real-time Firestore listeners
- High urgency counter
- Tab-based view (Patients / Volunteers)
- Dark mode support
- Clean UI with subtle animations

---

## AI / Automation Concept

CareConnect integrates AI to:

- Summarize medical descriptions
- Predict urgency level (LOW / MEDIUM / HIGH)
- Classify request category

This reduces manual triage effort and enables faster response prioritization.

AI integration is handled through:

- OpenRouter API
- Structured prompt engineering
- Safe fallback handling

---

## Tech Stack

Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion

Backend

- Next.js API Routes
- Firebase Firestore

AI

- OpenRouter

Deployment

- Vercel

---

## Firestore Collections

### support_requests

- name
- age
- location
- contact
- description
- selfUrgency
- ai_summary
- urgency
- category
- createdAt

### volunteers

- name
- skills
- availability
- location
- contact
- createdAt

---

## Local Setup

Clone repository:

```bash
git clone https://github.com/YOUR_USERNAME/careconnect.git
cd careconnect
```

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

OPENROUTER_API_KEY=
```

Run locally:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

---

## Design Principles

- Simplicity over feature bloat
- Clear validation and feedback
- Real-time visibility
- AI as augmentation, not replacement
- Production-ready structure

---

## Future Improvements

- Role-based authentication
- Admin analytics dashboard
- Request filtering and search
- NGO-specific reporting tools
- Notification system

---

CareConnect demonstrates how AI-assisted intake systems can modernize NGO healthcare workflows without introducing unnecessary complexity.
