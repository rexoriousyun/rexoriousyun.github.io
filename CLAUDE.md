# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Rex Yun's personal portfolio site — a static single-page site hosted on GitHub Pages. No build toolchain or package manager is used.

## Development

Open `index.html` directly in a browser (no local server required). The site is fully static.

**SCSS:** `css/main.scss` compiles to `css/main.css`. After editing the SCSS, recompile with:
```
sass css/main.scss css/main.css
```
The compiled `main.css` and `main.css.map` are committed alongside the source `main.scss`.

## Architecture

Everything lives in a single `index.html`. There is no routing library or framework.

**Page system:** Content is split into four `.page` elements (Title=0, About=1, Works=2, Contact=3), each identified by a `value` attribute. Only one page is visible at a time. Navigation is handled by clicking `.menu li` items, which hide/show pages by matching `value` attributes.

**Works → Modal flow:** Clicking a `.card` hides the `.works` grid and shows the corresponding `.modal` (matched by `value`). Modals are full-screen overlays. Navigation between modals uses:
- `.front` / `.back` arrow buttons (click)
- Swipe left/right on touch devices (via jQuery Mobile's `swipeleft`/`swiperight`)
- Keyboard left/right arrow keys

**Global state** in `js/main.js`:
- `menuOpen` — whether the slide-in nav is open
- `modalOpen` — whether a project modal is visible
- `currentNumber` — the `value` of the currently displayed modal

**Menu toggle:** The `+` header button (`.trigger`) opens/closes the side nav. On mobile (<600px), the menu takes full width and hides the content. Keyboard `Escape` and `Space` also trigger it.

**Vendor libraries** (all in `js/vendor/`, no CDN fallback except jQuery):
- jQuery 3.2.1 — DOM manipulation and animation
- jQuery UI — used for animate easing
- jQuery Mobile (custom build) — touch swipe events
- Modernizr 2.8.3 — feature detection (`no-js` class on `<html>`)

**Fonts** are local, declared in `css/font.css`, and stored in `css/fonts/`. The typefaces are `agencyFB` (h1 logo) and the `Orkney` family (Light, Regular, Medium — all body text).

**Responsive breakpoints** in SCSS: 1024px, 768px, 767px, 600px, 400px. Layout shifts from 3-column cards → 2-column → 1-column as viewport narrows. Modal `.full`/`.half` grid becomes block layout below 600px.
