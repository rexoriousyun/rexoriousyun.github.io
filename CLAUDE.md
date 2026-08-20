# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Rex Yun's personal portfolio site — a static site hosted on GitHub Pages. No build
toolchain, no package manager, no dependencies. Open `index.html` in a browser; that
is the whole development setup.

The site targets UX engineer / design technologist / design engineer roles, so the
craft of the page counts as portfolio evidence. Reviewers open devtools. Bundle
weight, semantics and accessibility are part of the work, not overhead on it.

## Architecture

Everything lives in one `index.html`. There is no framework and no router library.

**Views.** Five `.view` elements in one document: `#view-home` plus one per case
(`#view-grove`, `#view-design-guide`, `#view-creative-library`,
`#view-tree-of-knowledge`). `js/app.js` maps `location.hash` to a view and hides the
rest with the `hidden` attribute, so every case has its own shareable URL
(`#/work/grove`).

**Progressive enhancement.** The router is only exclusive once JS confirms it is
running: `app.js` adds `.js-router` to `#shell` at boot, and only
`.js-router .view[hidden]` sets `display:none`. With JS off, all five views render in
sequence and the work index is still readable. Do not put `hidden` in the markup.

**Controls** in `js/app.js`: hash routing, the Nightshift/Daylight toggle
(`data-mode` on `#shell`), and the four accent swatches (sets `--rx-accent` and a
darkened `--rx-accent-text` inline). Section jumps use delegation on `[data-jump="x"]`
→ `#s-x`, so no id list needs maintaining.

## CSS

Two layers, and the distinction matters.

**`css/ds/`** — the Rexorious design system, imported verbatim. Nine token files plus
`base.css`, pulled in by `styles.css`. This is the same system that lives in
`~/Documents/Github/creative-library/design-system/rexorious/`. Treat it as upstream:
do not hand-edit it to fix a page problem. If a value is wrong, fix it in the design
system and re-import.

**`css/site.css`** — this site's layer: the design-system components rebuilt as plain
CSS classes, then the page itself. Every value resolves to a `--rx-` token.

**Section 0 of `site.css` is an invariant-override block.** The imported token set has
five `contrast-minimum` failures (`--rx-text-mute` in both modes, day `--rx-link`, day
`--rx-warning`, and the ghost numerals). Contrast is invariant tier — not tradeable
against aesthetics — so it is corrected there, with the measured ratio recorded in a
comment beside each value. Fix these upstream and the whole block can be deleted.

## Images

Every media slot holds a real screenshot generated from the source project. There are
no placeholders left; if you add one, `.slot` is the dashed placeholder style and
`.shot` is a filled one.

- **`.shot` sets `height:auto`, and it is load-bearing.** The `width`/`height`
  attributes map to CSS `height`, which makes `aspect-ratio` inert and renders the
  image at its intrinsic pixel height. Keep the attributes (they reserve layout space)
  and keep `height:auto`.
- Alt text is required and checked by the gate.
- Filenames containing spaces must be percent-encoded in `src`. GitHub Pages is
  stricter than `file://`, so a raw space works locally and 404s in production.

## The gate

The site is checked against the substrate that case 02 describes:

```
cd ~/Documents/Github/design-guide
node engine/cli.js gate /home/rex/Documents/Github/rexoriousyun.github.io/index.html \
  --project /home/rex/Documents/Github/rexoriousyun.github.io
```

Fails are not negotiable; flags need a stated reason. The gate only sees the view the
router is showing, so to check a case page, copy `index.html` to a temp file with a
`<script>location.hash="#/work/grove"</script>` before `app.js` and gate that. Same
trick with a click on `#mode-toggle` after `app.js` to check Daylight.

## Deliberately absent

jQuery, jQuery UI, jQuery Mobile, Modernizr, the background video, the loading-screen
GIF, and the modal carousel were all removed in the rebuild. Do not reintroduce a
library for something the platform now does. Hand-written CSS is a portfolio asset
here; a utility framework is not.

`js/vendor/`, `css/main.scss`, `css/main.css` and several old images are still in the
repo but referenced by nothing. They are dead weight pending a decision, not
dependencies.

## Private notes

`design-brief.md`, `rex-yun-profile-brief.txt` and `linkedin-update-plan.txt` are
gitignored. They name the job search and contain personal contact details, and this
repo is public. Keep them out of commits.
