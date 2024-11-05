# React Notes

A modern notes application built with React + Vite, featuring archive/trash flows, mobile-first interactions, local persistence, theme support, and responsive UX patterns.

## Overview

This project is a single-page notes manager focused on speed and usability:

- Create and edit notes with color categories.
- Archive notes or move them to trash.
- Permanently delete trashed notes individually.
- Empty all trashed notes with one action.
- Restore notes from both archive and trash.
- Auto-clean trash items older than 30 days.
- Add demo notes from the sidebar.
- Search notes by title/content inside the active view.
- Use responsive mobile UX with burger menu and modal note form.
- Switch between Light and Dark themes.
- Use floating action buttons for New Note and Scroll to Top on mobile.

## Tech Stack

- React 18
- Vite 5
- React Icons
- uuid
- CSS Modules
- LocalStorage (client-side persistence)

## Project Structure

Key folders/files:

- `src/App.jsx`: app shell, state management, view routing, persistence, responsive logic.
- `src/InputForm/`: add/edit note form and related controls.
- `src/LIst/`: list rendering, note cards, card actions, details popup.
- `src/global.css`: global tokens, theme variables, base layout color system.
- `index.html`: app mount points (`root` and `modal-root`).

## Features

### Note Lifecycle

- **Active** view for normal notes.
- **Archive** view for archived notes.
- **Trash** view for deleted notes.
- **Restore** from archive/trash back to active.
- **Permanent delete (single)** for a note inside trash.
- **Empty Trash (bulk)** action to remove all trashed notes.
- **Auto-delete policy**: trash notes older than 30 days are removed automatically.

### Editing & Display

- Add and edit notes with title, body, and color selection.
- IDs for new notes and demo notes are generated via UUID.
- Word-limit truncation on cards with ellipsis (`...`) for long note content.
- Overflow-aware `View` action to open full note details in popup.

### Data Utilities

- Sidebar action to seed demo/fake notes for quick testing.

### Mobile UX

- Off-canvas burger sidebar on mobile.
- Floating `+` button for creating notes.
- Modal form (via React Portal) for mobile add/edit.
- Floating scroll-to-top button.

### Theme

- Light/Dark theme toggle.
- Theme preference persisted in browser localStorage.

## Getting Started

### Prerequisites

- Node.js `>=18.x` (recommended LTS)
- npm `>=9.x`

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

By default, Vite runs on:

- `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Build output is generated in:

- `dist/`

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Configuration

This project currently runs without required environment variables.

Persisted browser keys used by the app:

- `my-note-list`: notes data.
- `my-note-theme`: selected theme (`light` or `dark`).

## Architecture Notes

- State is managed in `App.jsx` and passed down as props.
- Notes are normalized on load and cleaned for expired trash data.
- Responsive behaviors are controlled through viewport checks plus CSS media queries.
- Portals are used for modal rendering to avoid layout/z-index conflicts.

## Deployment

The app is a static frontend bundle and can be deployed to any static host:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- S3 + CloudFront

Typical deploy flow:

1. `npm run build`
2. Upload/publish `dist/`

## Quality & Maintenance

Recommended for production hardening:

- Add unit/integration tests (form submission, lifecycle transitions, cleanup policy).
- Add E2E tests for mobile modal and sidebar interactions.
- Add CI pipeline for lint + build validation.
- Add error boundary and optional telemetry.

## Contribution Guide

1. Create a feature branch.
2. Make focused changes.
3. Run `npm run lint` and `npm run build`.
4. Open PR with screenshots for UI changes.

## License

No license file is currently defined in this repository. Add one if this project is intended for public distribution.
