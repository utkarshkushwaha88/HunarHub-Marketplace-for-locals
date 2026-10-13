# HunarHub Frontend v2

A properly separated Phase 1 React frontend for the HunarHub local skills + handmade products marketplace.

## Structure

- `src/pages/` — one file per page
- `src/components/layout/` — Navbar, Footer, Layout
- `src/components/common/` — shared UI components
- `src/components/home/` — landing-page sections
- `src/components/entrepreneur/` — entrepreneur UI
- `src/components/product/` — product UI
- `src/components/service/` — service UI
- `src/data/` — demo data
- `src/styles/` — global stylesheet

## Run

```bash
npm install
npm run dev
```

## Routes

`/`
`/entrepreneurs`
`/entrepreneurs/:id`
`/products`
`/products/:id`
`/services`
`/services/:id`
`/login`
`/register`
`/forgot-password`

Backend, JWT, MongoDB Atlas, Razorpay, image upload and admin functionality are intentionally not connected in this Phase 1 frontend.

## Interaction
Framer Motion is included for page/section reveals, hover/tap feedback, mobile navigation animation, animated navigation state, and hero motion. CSS adds focus, shadow, image, and micro-interactions. Reduced-motion preferences are respected.


## v5 Styling
This version intentionally uses plain CSS only. Tailwind CSS, PostCSS, and Tailwind config files are not included. Framer Motion is used for interaction and animation.


## v6 Modern Tailwind UI
This version uses Tailwind CSS as the primary styling system. The previous semantic CSS files were removed. The visual system uses a high-contrast forest/terracotta palette, white surfaces, responsive grids, accessible focus states, and Framer Motion for restrained interaction.


## v7 Fixes
Tailwind is now used consistently across navbar, footer, listing pages, filters, product/service details, entrepreneur profile, auth pages, cards, and responsive layouts. The desktop container was widened to 1440px to reduce excessive left/right whitespace. No legacy component CSS remains.


## v8 Color System
Primary visual palette: Background #F8FAFC, Surface #FFFFFF, Primary #111827, Secondary text #64748B, Border #E2E8F0, Primary accent #7C3AED, Accent hover #6D28D9, Soft accent #F3E8FF, Success #16A34A, Warning #F59E0B, Error #DC2626. Tailwind CSS is used throughout the UI.


## v9 Theme System
Added Light/Dark mode using Tailwind `darkMode: "class"`. Theme follows the user's system preference on first visit, can be manually toggled from the navbar, and persists in `localStorage` under `hunarhub-theme`. The violet palette remains the primary brand in both themes.


## v10 Layout Fix
Large-screen content now uses a 1680px maximum width instead of 1440px, reducing excessive side margins on 1600–1920px windows. Hero columns have explicit minimum widths and a larger controlled gap so text and visual cards do not collide. Home sections use the same responsive width system.


Notifications are available at `/notifications` for authenticated users.
