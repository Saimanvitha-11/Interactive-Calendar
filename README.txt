# Interactive Calendar — Production-Level Frontend Component

A thoughtfully designed, high-performance calendar component built with **React, TypeScript, and Tailwind CSS**, focused on delivering a clean user experience, smooth interactions, and scalable frontend architecture.

This project reflects my approach to frontend engineering — combining **functionality, design precision, and user-centric thinking** into a single, polished component.

---

## 🚀 Overview

This is a fully interactive calendar application that enables users to:

* Navigate seamlessly across months
* Select date ranges with intuitive visual feedback
* Create, edit, and organize notes per date
* Switch between light and dark themes
* Persist all data locally without external dependencies

The goal was to build something that doesn’t just work — but **feels refined, responsive, and production-ready**.

--------------------------------------------------------------------------------
LIVE DEMO & VIDEO WALKTHROUGH

Live Application:
[https://interactive-calendar-eight.vercel.app?_vercel_share=JBbYP46ZkHpi94NKCOTlVNM8j2vCfnSr]

Example:
https://your-calendar.vercel.app

Video Demonstration:
[https://www.loom.com/share/a8d9950bd6bd4ce09a76a5ab02d85610]

Example:
https://www.loom.com/share/your-video-id

--------------------------------------------------------------------------------

## ⚡ Quick Start

```bash
npm install --legacy-peer-deps
npm run dev
```

Visit: http://localhost:5173

---

## ✨ Key Features

* **Interactive Month View** with current day highlighting
* **Date Range Selection** with clear start, end, and in-range states
* **Notes System** with color tagging and edit/delete support
* **Theme Switching** (light/dark mode with persistence)
* **Keyboard Navigation** for improved accessibility
* **Fully Responsive Design** across mobile, tablet, and desktop
* **Local Persistence** using browser localStorage
* **Smooth Micro-interactions** for enhanced UX

---

## 🧠 Design & UX Philosophy

This project was built with a strong emphasis on:

* **Clarity over clutter** — minimal but meaningful UI
* **Immediate feedback** — every interaction reflects instantly
* **Consistency** — spacing, typography, and states are deliberate
* **Performance** — no unnecessary re-renders or heavy dependencies

Rather than over-engineering, I focused on **getting the fundamentals right at a high level**.

---

## 🛠 Tech Stack

**Frontend**

* React 18 (Hooks, Functional Components)
* TypeScript (Type safety and maintainability)
* Tailwind CSS (Utility-first styling)
* Vite (Fast build tool)

**Utilities**

* date-fns (Date manipulation)
* lucide-react (Icons)

**Storage**

* Browser localStorage (client-side persistence)

---

## 📁 Project Structure

```
client/src/
├── components/
│   ├── CalendarEnhanced.tsx
│   ├── HeroSection.tsx
│   ├── NoteDialog.tsx
│   ├── NotesSidebar.tsx
│   └── ThemeSwitcher.tsx
├── hooks/
│   └── useKeyboardNavigation.ts
├── lib/
│   └── storage.ts
├── pages/
│   └── Home.tsx
└── index.css
```

The architecture is modular and designed for **scalability and readability**.

---

## 📱 Responsiveness

* **Desktop:** Structured layout with clear separation between calendar, notes, and visual elements
* **Mobile:** Optimized stacking layout with touch-friendly interactions

Every interaction is designed to feel natural across devices.

---

## 🎯 Key Engineering Decisions

### Why no backend?

* Keeps the project lightweight and focused on frontend capabilities
* Eliminates deployment complexity
* Ideal for demonstrating UI/UX and state management skills

### Why localStorage?

* Instant data persistence
* Works offline
* No latency or API dependency

### Why Tailwind CSS?

* Rapid UI development
* Consistent design system
* Easy scalability and customization

---

## 🔮 Future Improvements

* Cloud sync (Firebase / Supabase)
* Recurring events
* Calendar integrations (Google / iCal)
* Notifications & reminders
* Multi-calendar support

---

## 🧪 Troubleshooting

**Dependencies issue**

```bash
npm install --legacy-peer-deps
```

**App not running**

* Ensure dev server is active
* Try a different port
* Clear browser cache

**Notes not saving**

* Check localStorage permissions
* Avoid incognito mode

---

## 📦 Build & Deployment

```bash
npm run build
```

Deploy easily on:

* Vercel
* Netlify
* Any static hosting platform

---

## 📄 License

MIT License

---

## 💬 Final Note

This project is a reflection of how I approach frontend development —
not just building features, but **crafting experiences that are intuitive, performant, and scalable**.

If you're reviewing this, I’d recommend exploring:

* Date range interactions
* Notes workflow
* Responsiveness across devices

---
