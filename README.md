# React Test App — Local-first user directory

Next.js (App Router) + Tailwind + Zustand + Dexie. Fetches users from RandomUser and caches pages in IndexedDB for offline viewing. Includes pagination, offline toggle, search, sorting, dark mode, and favorites persistence.

## Install
```bash
npm install
```

## Run
```bash
npm run dev
```
Open http://localhost:3000.

## Simulate offline/failure
- Devtools → Network → Offline, then reload a page you already fetched to see cached users.
- Block `randomuser.me` or turn off Wi‑Fi to force a fetch failure; cached pages stay visible and the UI shows offline mode.
- “Go offline” toggle in the UI forces cache-only mode without touching your network.

## Known issues / limitations
- Favorites persist and toggle, but there’s no favorites-only view yet.
- Cache is per page: a page must be loaded once before it’s available offline.
- Error handling is basic (refresh button, inline notice).

## What I’d improve with more time
- Add favorites filter and badges.
- Persist search/sort to Dexie so filters survive reloads.
- Broader tests (store/offline behavior, Playwright for UI).
- Service worker/PWA manifest for smoother offline.
- Richer error/retry flows and accessibility polish.

## Nice-to-haves implemented
- Manual “Go Offline” toggle.
- Search/filter by name/email/location.
- Sort by name/email/city/country.
- Dark mode via Tailwind `dark:` utilities.
- Basic Jest tests for UI components (`npm run test`).
