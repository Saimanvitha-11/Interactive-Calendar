================================================================================
                            CALENDAR
                   A Production-Level Interactive Calendar
                     Built with React, TypeScript & Tailwind
================================================================================

WHAT IS THIS?

This is a fully functional calendar app where you can:
- Navigate months with arrow keys or buttons
- Select date ranges with your mouse
- Create & organize notes by date
- Switch between light/dark mode
- Everything saves to your browser locally

No backend. No API. No complications. Just a calendar that actually feels nice to use.

================================================================================
                          QUICK START
================================================================================

npm install --legacy-peer-deps
npm run dev

Open http://localhost:5173

That's it.

================================================================================
                          KEY FEATURES
================================================================================

✓ Beautiful month view with today highlighting
✓ Drag to select date ranges (visual feedback included)
✓ Create notes with 5 color themes
✓ Light & dark mode
✓ Keyboard shortcuts (← → T)
✓ Responsive design (mobile, tablet, desktop)
✓ All data persists in localStorage
✓ Smooth animations (not annoying)
✓ Premium UI that impresses

================================================================================
                          HOW TO USE
================================================================================

NAVIGATION:
- Click Previous/Next or press ← →
- Press T to jump to today
- Tab to navigate dates

CREATE A NOTE:
- Click any date
- Add title + content
- Pick a color
- Save

EDIT/DELETE:
- Hover over a note
- Click the pencil or trash icon

THEME:
- Click the sun/moon icon in the header
- Preference saves automatically

================================================================================
                          TECHNICAL STACK
================================================================================

Frontend:
- React 18 (functional components, hooks)
- TypeScript (full type safety)
- Vite (build tool, fast dev server)
- Tailwind CSS (styling)
- date-fns (date utilities)
- lucide-react (icons)

Storage:
- Browser localStorage (no backend needed)

================================================================================
                          PROJECT STRUCTURE
================================================================================

client/src/
├── components/
│   ├── CalendarEnhanced.tsx    - Main calendar (date grid, selection)
│   ├── HeroSection.tsx         - Visual hero banner
│   ├── NoteDialog.tsx          - Note creation/edit modal
│   ├── NotesSidebar.tsx        - List of notes
│   └── ThemeSwitcher.tsx       - Light/dark toggle
├── hooks/
│   └── useKeyboardNavigation.ts - Keyboard shortcuts
├── lib/
│   └── storage.ts             - localStorage service
├── pages/
│   └── Home.tsx               - Main layout
└── index.css                  - Global styles + animations

================================================================================
                          BUILD & DEPLOY
================================================================================

Build:
npm run build

Output: dist/public/

Deploy to:
- Netlify (drag & drop dist/public)
- Vercel (connect GitHub)
- Any static host

================================================================================
                          NOTES
================================================================================

Data:
- Notes stored in browser localStorage
- ~100KB per month of notes (typical usage)
- Data persists across refreshes and sessions
- Clear data by going to DevTools > Application > Local Storage

Browser Support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

TypeScript:
npm run check    - Type checking
npm run build    - Production build

================================================================================
                          DESIGN DECISIONS
================================================================================

Why no backend?
- Simpler to deploy & showcase
- No server needed for personal use
- All data stays on your device
- Perfect for portfolio

Why localStorage?
- Fast, immediate saves
- No network latency
- Works offline
- Sufficient for a personal calendar

Why these animations?
- Smooth but performant (GPU accelerated)
- Enhance UX without distraction
- Industry-standard patterns

Why Tailwind?
- Rapid development
- Consistent design system
- Easy to customize
- Small bundle when optimized

================================================================================
                          FUTURE IDEAS
================================================================================

- Cloud sync (Firebase / Supabase)
- Recurring events
- Export to iCal
- Reminders/notifications
- Time zones support
- Multi-calendar support

================================================================================
                          TROUBLESHOOTING
================================================================================

npm install fails?
npm install --legacy-peer-deps

Calendar doesn't appear?
- Check npm run dev is running
- Try port 3000: npm run dev -- --port 3000
- Clear browser cache

Notes not saving?
- Check localStorage is enabled
- Try non-private/incognito mode
- Check browser storage limit

================================================================================
                          LICENSE
================================================================================

MIT - Use it however you want.

Built with React, TypeScript, Tailwind CSS, and date-fns.

================================================================================

Questions? Check the git repo or dive into the code.
- It's clean, well-organized, and easy to follow.
- Comments removed for production quality.
- Type-safe throughout.

Enjoy!

================================================================================
