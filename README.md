# Cine-Stream — Next.js 15 Migration

**Sprint 9 | Prodesk IT Internship | Frontend Architecture Track**

A migration of the Sprint 8 CineGrid SPA into Next.js 15 (App Router), focused on server-side rendering, SEO optimization, and a clean split between server and client components.

**Live:** https://prodesk-sprint-9.vercel.app/
<img width="1917" height="1156" alt="image" src="https://github.com/user-attachments/assets/79822875-4ede-4b2c-8792-cfc077a887ad" />


---

## Overview

Cine-Stream is a movie discovery app powered by the TMDB API. This sprint re-architects the original Vite + React Router SPA (Sprint 8) into a Next.js App Router project, moving initial data fetching to the server and isolating interactivity into client components.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **API:** TMDB (The Movie Database)
- **Styling:** Class-based CSS, dark glassmorphism aesthetic
- **Deployment:** Vercel

## Phase 1 — Base Architecture (P0)

- Initialized Next.js 15 with App Router, no `src/` directory
- Migrated the Sprint 8 CineGrid UI (components, styles, layout) into the new structure
- Deprecated `react-router-dom` in favor of Next.js file-based routing:
  - `/` — popular movies
  - `/search?q=` — search results
  - `/movie/[id]` — movie detail (dynamic route)
  - `/favorites` — saved favorites

## Phase 2 — State & Integration (P1)

- **Server Components:** Initial "Popular Movies" data is fetched directly inside `app/page.js` using `async`/`await` — no `useEffect` involved in the first paint.
- **Client Components:** Interactivity (search input, infinite scroll, favorite toggling) is isolated to components marked `"use client"` — `SearchBar`, `MovieGrid`, `MovieCard`, `HomeClient`.
- **API Route:** A Next.js Route Handler (`app/api/movies/route.js`) proxies paginated/search requests server-side, keeping the TMDB API key out of the browser bundle entirely.

## Project Structure

```
app/
  layout.js            → root shell, Navbar, metadata
  page.js              → home (Server Component, initial fetch)
  search/page.js        → search results (Server Component)
  movie/[id]/page.js    → movie detail (dynamic route)
  favorites/page.js     → saved favorites
  api/movies/route.js    → server-side pagination/search endpoint
  globals.css
components/
  HomeClient.js         → client-side state orchestration
  MovieCard.jsx
  MovieGrid.jsx
  Navbar.jsx
  SearchBar.jsx
hooks/
  useMovies.js          → pagination/load-more logic
  useFavorites.js       → localStorage-synced favorites
  useDebounce.js        → search input debouncing
lib/
  tmdb.js               → TMDB fetch helpers (server-only)
```

## Environment Variables

```
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_key_here
NEXT_PUBLIC_TMDB_IMG_URL=https://image.tmdb.org/t/p/w500
```

`TMDB_API_KEY` and `TMDB_BASE_URL` are server-only (no `NEXT_PUBLIC_` prefix) and are never exposed to the client. `NEXT_PUBLIC_TMDB_IMG_URL` is safe to expose since it's just a public CDN path used for rendering posters client-side.

## Notes

- Favorites are stored in `localStorage`, scoped to the browser.
- Infinite scroll uses `IntersectionObserver`, isolated to a client component.
- Search debounces user input (500ms) before updating the URL query string, so the URL always reflects the active search — enabling shareable/bookmarkable search links.
