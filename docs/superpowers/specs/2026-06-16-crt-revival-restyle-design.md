# Sparrow CRT Revival — Restyle Design

**Date:** 2026-06-16
**Source design:** "Sparrow CRT Revival" (Sparrow Design Language project, claude.ai/design)

## Goal

Restyle the existing Sparrow / Retro Insomnium site to the **CRT Revival** visual
language while preserving all existing structure, routing, accessibility work, and
interactive behavior. This is a CSS-vocabulary swap plus a few targeted component
edits — not a rebuild.

The site is Svelte 5 (Vite, no SvelteKit). `App.svelte` composes `Navbar`, `Hero`,
`About`, `Portfolio`, `Blog`, `Contact`, `Footer`, with `#/blog/<slug>` and `#/admin`
hash routes. Styling is global in `src/app.css`; palette + fonts already live in
`tailwind.config.js` and match the design exactly (no token changes needed).

## Visual language (from the design)

The CRT Revival look differs from the current "Modernization Study" look on these axes:

| Axis | Current | CRT Revival |
|---|---|---|
| Corners | rounded (12–16px, pills) | **square** (`border-radius: 0`) |
| Shadows | soft glows (`0 8px 30px rgba(...)`) | **hard pixel offsets** (`3px 3px 0 var(--accent-dim)`) |
| Primary button | magenta→purple gradient, lift on hover | **solid magenta** on dark ink, **press-in** on hover |
| Secondary button | thin border, soft glow | 2px accent border + pixel shadow |
| Background | flat `#0c0613` + faint SVG noise | `#0c0613` + faint **7px accent grid** + **scanlines** + **vignette** |
| Avatar | round, spinning conic-gradient ring | **square pixel frame**, 2px accent border, inset vignette |
| Cursor | soft cursor-follow glow | **removed** |
| Wordmark | static "RETRO INSOMNIUM" w/ cyan hard text-shadow | **blinking CRT cursor + typing loop** |

### New CSS variables (add to `:root` in `app.css`)

```css
--ink: #18061f;
--shadow-pixel: 3px 3px 0 #922AB1;        /* accent-dim  */
--shadow-pixel-deep: 4px 4px 0 #4C0E61;   /* accent-deep */
--shadow-pixel-dark: 4px 4px 0 rgba(0,0,0,0.45);
```
(`--accent-deep` `#4C0E61` is new; other colors already exist as Tailwind tokens and
literals throughout `app.css`.)

## Scope (confirmed)

- **Whole site.** Because styling is global, restyling `app.css` propagates the CRT
  look to Blog, BlogPost, Admin, About, mobile menu, and lightbox automatically. A few
  components need markup-level edits (below).
- **All four behavior swaps confirmed:** typing wordmark, square pixel avatar, CRT
  scanlines + grid, drop cursor glow.

## Changes by file

### `src/app.css` (bulk of the work)
1. **`:root`** — add `--ink`, `--accent-deep`, and the three `--shadow-pixel*` vars.
2. **`body`** — add layered grid background
   (`linear-gradient` 1px accent lines at `background-size: 7px 7px`) over `#0c0613`.
3. **`body::before`** — fixed scanline overlay
   (`repeating-linear-gradient` 2px transparent / 1px black, `mix-blend-mode: multiply`,
   `z-index: 9999`, `pointer-events: none`).
4. **`body::after`** — fixed vignette (`box-shadow: inset 0 0 160px rgba(0,0,0,0.55)`,
   `z-index: 9998`). Both gated so they don't capture pointer events.
5. **`.noise-overlay`** — remove the rule (div also removed from `App.svelte`).
6. **`.cursor-glow`** — remove the rule (component removed).
7. **`.wordmark`** — replace cyan-text-shadow treatment with CRT treatment: plain
   `--text` color; add `.wm-suffix` (accent) and `.cursor` (blinking accent block,
   `@keyframes blink`) sub-styles.
8. **Buttons** — rewrite `.btn-primary` (solid `--accent` bg, `--ink` text, 2px accent
   border, `--shadow-pixel`; hover `translate(2px,2px)` + shrunk shadow; active
   `translate(3px,3px)` + no shadow). `.btn-secondary` (transparent, 2px accent border,
   `--shadow-pixel-deep`, hover press-in + faint accent wash). Add `.btn-sm`.
   Drop the `::before` gradient layer.
9. **`border-radius: 0`** everywhere it currently rounds: `.skip-link`, `.filter-btn`,
   `.social-icon`, `.contact-card`, `.admin-input`, `.blog-card`, `.lightbox-*`,
   `.prose-blog code/pre/img/blockquote`, portfolio items.
10. **`.filter-btn`** — square, `--border-mid` border, hover accent border;
    `.active` = solid accent on ink + `2px 2px 0 var(--accent-dim)`.
11. **`.portfolio-item`** — square, `--shadow-pixel-dark`; hover `translate(-2px,-2px)`
    + `5px 5px 0 var(--accent-deep)` + accent border (replaces soft lift). Keep the
    existing `.reveal`, overlay, and `.portfolio-expand` behavior (expand badge squared).
12. **`.social-icon`** — square, pixel shadow on hover.
13. **`.blog-card`** — square; replace gradient-border `::before` + soft shadow with a
    pixel-offset hover. Keep hover heading-accent behavior.
14. **`.admin-input`** — square; focus = accent border + `--shadow-pixel-deep`.
15. **`.contact-card`** — square, `--border-mid` border, inset accent wash.
16. Keep `:focus-visible` rings (cyan) — squared via `outline-offset`, no radius needed.
17. Keep the `prefers-reduced-motion` block; add `.cursor { animation: none }` and
    disable portfolio hover transitions there to match the design.

### `src/App.svelte`
- Remove `import CursorGlow` and its `<CursorGlow />` usage.
- Remove the `<div class="noise-overlay">` element.

### `src/lib/CursorGlow.svelte`
- Delete the file.

### `src/lib/Navbar.svelte`
- Keep logo + brand. Replace the static `RETRO INSOMNIUM` text with a wordmark that
  shows `RETRO`, a typed `.wm-suffix` span, and a `.cursor` span.
- Add a typing controller (Svelte `onMount`, cleaned up on destroy): type ` INSOMNIUM`,
  hold ~2.4s, erase, hold ~1.8s, loop. Caret stops blinking while typing/erasing,
  resumes on hold. **Gate behind `prefers-reduced-motion`** — when reduced, render the
  full static `RETRO INSOMNIUM` and a non-animated cursor.

### `src/lib/Hero.svelte`
- Replace `.avatar-container` / `.avatar-img` markup with the design's
  `.avatar-frame` > `img` (square, 2px accent border, `--shadow-pixel-deep`, inset
  `::after` vignette). Remove the old conic-ring classes' markup usage. Hero copy,
  badge, buttons, and scroll cue unchanged (buttons inherit new `.btn-*`).

### `src/lib/Footer.svelte`
- Update `.wordmark` markup to match nav (static here — no typing loop in footer).

## Out of scope (YAGNI)
- No theme toggle / light mode.
- No content, copy, routing, or data changes.
- No new portfolio items or images (existing assets already match the design).
- No Tailwind token changes (palette + fonts already correct).

## Risks / decisions
- **Wordmark brand:** Confirmed — keep "RETRO INSOMNIUM", type `RETRO` → ` INSOMNIUM`
  (do NOT adopt the design's literal `sparrow`/`matchan`).
- **Scanline/vignette z-index:** the design uses `z-index: 9998/9999` on `body::*`.
  These sit above content but are `pointer-events: none`. Existing modals (mobile menu
  z-60, lightbox z-200, skip-link z-300) render below the overlay visually but remain
  interactive — acceptable and matches the design's intent (overlay covers everything).
- **Reduced motion:** typing loop, caret blink, and portfolio hover transforms all
  gated, consistent with the existing reduced-motion block.

## Success criteria
- Site builds (`npm run build`) and `svelte-check` passes.
- Every section (hero, about, portfolio, blog, contact, footer, blog post, admin)
  renders with square corners, pixel shadows, scanlines + grid, and no cursor glow.
- Primary buttons are solid magenta with press-in hover; avatar is a square pixel frame.
- Nav wordmark types `RETRO` → ` INSOMNIUM` and loops, static under reduced motion.
- No console errors; no leftover references to `CursorGlow` or `.noise-overlay`.
