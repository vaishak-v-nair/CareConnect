# 🏥 CareConnect

**AI-powered Healthcare Support Web App (Concept-Level Prototype)**

CareConnect is a lightweight healthcare intake system designed for NGOs and community organizations.

It allows patients to submit support requests, volunteers to register, and administrators to manage cases — enhanced with AI-based triage and summarization.

---

## 🌍 Live Demo

🔗 **Live Hosted App:**
([Link](https://care-connect-3qrh8d7kh-speakance-vercel-projects.vercel.app))
![Uploading Screenshot 2026-02-13 204337.png…]()

---

## 🎯 Problem Statement

NGOs handling medical or emergency support often:

* Collect requests manually via WhatsApp / Google Forms
* Struggle to prioritize urgent cases
* Lack structured intake and triage systems
* Have difficulty matching volunteers to needs

CareConnect solves this by:

* Structuring intake
* Automatically summarizing cases
* Categorizing urgency using AI
* Providing a simple admin dashboard

---

## 🧠 AI / Automation Idea

The app integrates AI to automatically:

* Generate a short summary of the patient's description
* Classify urgency (LOW / MEDIUM / HIGH)
* Categorize medical need (General / Emergency / etc.)

This helps NGOs prioritize cases faster without manual review of every long description.

---

## 🛠 Tech Stack

**Frontend**

* Next.js (App Router)
* React
* Tailwind CSS v4

**Backend**

* Next.js API Routes
* Firebase Firestore

**AI Integration**

* OpenRouter API (LLM-based summarization + triage logic)

**Hosting**

* Vercel

---

## ✨ Features

### 🩺 Patient Support Form

* Structured input fields
* Self-reported urgency selection
* Client-side validation
* AI-based summary + urgency detection
* Firestore storage

### 🤝 Volunteer Registration

* Skill tagging
* Availability input
* Firestore storage
* Success animation + confetti

### 📊 Admin Dashboard

* View patient requests
* View volunteer registrations
* Urgency color indicators
* Live Firestore updates
* Dark mode support

---

## 🗂 Project Structure

```
app/
 ├── page.tsx              → Landing page
 ├── support/              → Patient form
 ├── volunteer/            → Volunteer form
 ├── admin/                → Admin dashboard
 ├── api/
 │    ├── support/route.ts
 │    ├── volunteer/route.ts
 │    └── ai/route.ts
lib/
 ├── firebase.ts
 ├── firebaseAdmin.ts
 ├── validators.ts
 └── openrouter.ts
components/
 ├── BackgroundBlobs.tsx
 ├── PageTransition.tsx
 ├── SuccessAnimation.tsx
```

---

## 🔥 Firestore Collections

* `support_requests`
* `volunteers`

---

## 🚀 Local Setup

1. Clone the repository
2. Install dependencies

```
npm install
```

3. Create `.env.local`

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

OPENROUTER_API_KEY=
```

4. Run locally

```
npm run dev
```

---

## 📦 Deployment

Deployed using **Vercel**

Environment variables configured in:
Vercel → Project Settings → Environment Variables

---

## 🏢 NGO Use Case

This prototype can be used by:

* Community health NGOs
* Disaster response teams
* Rural outreach programs
* Medical volunteer networks

It reduces manual triage effort and provides a structured intake system with automation.

---

## 📌 Note

This is a concept-level prototype built for evaluation purposes.
The goal is clarity, structure, and meaningful AI integration rather than production-scale security or authentication.

---

## 👤 Author

Vaishak V Nair

B.Tech Computer Science

AI/ML Enthusiast

---
