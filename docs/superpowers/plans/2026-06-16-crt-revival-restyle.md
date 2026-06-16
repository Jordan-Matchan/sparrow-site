# CRT Revival Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing Sparrow / Retro Insomnium Svelte site to the "CRT Revival" visual language — square corners, hard pixel shadows, solid press-in buttons, scanlines + grid + vignette, square pixel avatar, and a typing nav wordmark — without changing structure, routing, content, or accessibility behavior.

**Architecture:** Almost all changes live in the global stylesheet `src/app.css` (the palette + fonts are already correct in `tailwind.config.js` and `index.html`). A handful of components get markup edits: `App.svelte` (remove overlay + cursor glow), `Hero.svelte` (square avatar), `Navbar.svelte` (typing wordmark), `Footer.svelte` (wordmark markup). `CursorGlow.svelte` is deleted.

**Tech Stack:** Svelte 5 (runes), Vite 8, Tailwind 3, plain CSS. No test framework — verification is `npm run build`, `npx svelte-check`, `grep`, and visual confirmation via `npm run dev`.

**Reference spec:** `docs/superpowers/specs/2026-06-16-crt-revival-restyle-design.md`

---

## Verification model (read first)

There are no unit tests in this repo. Each task's verification is:
1. `npx svelte-check` → expect **0 errors** (warnings about a11y may pre-exist; do not introduce new ones).
2. `npm run build` → expect a successful Vite build, no CSS/JS errors.
3. Task-specific `grep` checks where noted.
4. Visual check in `npm run dev` (note what to look for).

Commit after each task.

---

## Task 1: Add CRT tokens + global atmosphere (grid, scanlines, vignette)

**Files:**
- Modify: `src/app.css` (the `:root` block does not yet exist — there are no CSS vars; add one. Also modify the `.noise-overlay` and `.cursor-glow` rules and add `body` styling.)

- [ ] **Step 1: Add a `:root` token block at the very top of `src/app.css`, immediately after the three `@tailwind` lines (before the `@font-face` rules).**

```css
:root {
  --bg: #0c0613;
  --surface: #160a20;
  --surface-light: #22102e;
  --accent: #E781FF;
  --accent-dim: #922AB1;
  --accent-deep: #4C0E61;
  --warm: #C9F6FF;
  --text: #E8F0F5;
  --muted: #A98DC0;
  --border: #3a1d4d;
  --border-mid: #5a2d6d;
  --ink: #18061f;
  --shadow-pixel: 3px 3px 0 var(--accent-dim);
  --shadow-pixel-deep: 4px 4px 0 var(--accent-deep);
  --shadow-pixel-dark: 4px 4px 0 rgba(0, 0, 0, 0.45);
}
```

- [ ] **Step 2: Add `body` grid background + CRT overlays. Insert this directly after the existing `html { scroll-behavior: smooth; }` rule (around line 23-25 in the `Base & Reset` section).**

```css
body {
  background-image:
    linear-gradient(rgba(231, 129, 255, 0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(231, 129, 255, 0.022) 1px, transparent 1px);
  background-size: 7px 7px, 7px 7px;
  position: relative;
  overflow-x: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  background: repeating-linear-gradient(rgba(0, 0, 0, 0) 0 2px, rgba(0, 0, 0, 0.14) 2px 3px);
  mix-blend-mode: multiply;
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  box-shadow: inset 0 0 160px rgba(0, 0, 0, 0.55);
}
```

Note: the `bg-bg` class on `<body>` in `index.html` still supplies the base `#0c0613` color; the gradients layer on top of it.

- [ ] **Step 3: Remove the `.noise-overlay` rule** (currently around lines 105-115, the block under `/* ===== Noise Overlay ===== */`). Delete the comment header and the entire `.noise-overlay { ... }` rule.

- [ ] **Step 4: Remove the `.cursor-glow` rule** (currently around lines 117-129, under `/* ===== Cursor Glow ===== */`). Delete the comment header and the entire `.cursor-glow { ... }` rule. Also remove the `.cursor-glow { display: none; }` line inside the `@media (prefers-reduced-motion: reduce)` block near the end of the file.

- [ ] **Step 5: Verify build + check.**

Run: `npx svelte-check`
Expected: 0 errors.

Run: `npm run build`
Expected: build succeeds. (At this point `App.svelte` still references the removed classes via elements; that is fine — missing CSS rules don't break the build. They're removed in Task 2.)

- [ ] **Step 6: Commit.**

```bash
git add src/app.css
git commit -m "style(crt): add CRT tokens, grid background, scanlines and vignette"
```

---

## Task 2: Remove CursorGlow + noise overlay from the app

**Files:**
- Modify: `src/App.svelte:3` (import) and `src/App.svelte:66-68` (usage + overlay div)
- Delete: `src/lib/CursorGlow.svelte`

- [ ] **Step 1: In `src/App.svelte`, remove the CursorGlow import.** Delete this line (line 3):

```js
import CursorGlow from './lib/CursorGlow.svelte';
```

- [ ] **Step 2: In `src/App.svelte`, remove the `<CursorGlow />` usage and the noise overlay div.** The current block (lines 66-68) reads:

```svelte
<CursorGlow />

<div class="noise-overlay"></div>
```

Delete both — so the markup now begins directly with the `<div inert={modalOpen} ...>` wrapper.

- [ ] **Step 3: Delete the CursorGlow component file.**

```bash
git rm src/lib/CursorGlow.svelte
```

- [ ] **Step 4: Verify no references remain.**

Run: `grep -rn "CursorGlow\|noise-overlay\|cursor-glow" src/`
Expected: **no matches.**

- [ ] **Step 5: Verify build + check.**

Run: `npx svelte-check`
Expected: 0 errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 6: Commit.**

```bash
git add -A
git commit -m "style(crt): drop cursor glow and noise overlay"
```

---

## Task 3: CRT buttons + global square corners

**Files:**
- Modify: `src/app.css` — `.skip-link` (line ~63), `.btn-primary` (lines ~318-365), `.btn-secondary` (lines ~367-391).

- [ ] **Step 1: Square the skip link.** In `.skip-link`, change `border-radius: 12px;` to `border-radius: 0;`.

- [ ] **Step 2: Replace the entire `.btn-primary` rule set** (the `.btn-primary { ... }`, `.btn-primary::before { ... }`, `.btn-primary:hover, .btn-primary:focus-visible { ... }`, `.btn-primary:hover::before, ... { ... }`, and `.btn-primary > * { ... }` blocks) **with:**

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.4rem;
  background: var(--accent);
  color: var(--ink);
  font-family: 'VCR OSD Mono', ui-monospace, monospace;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 2px solid var(--accent);
  border-radius: 0;
  text-decoration: none;
  cursor: pointer;
  box-shadow: var(--shadow-pixel);
  transition: transform 0.14s ease, box-shadow 0.14s ease, background 0.14s ease;
}

.btn-primary:hover,
.btn-primary:focus-visible {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--accent-dim);
  color: var(--ink);
}

.btn-primary:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 var(--accent-dim);
}
```

- [ ] **Step 3: Replace the entire `.btn-secondary` rule set** (`.btn-secondary { ... }` and `.btn-secondary:hover, .btn-secondary:focus-visible { ... }`) **with:**

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.4rem;
  background: transparent;
  color: var(--accent);
  font-family: 'VCR OSD Mono', ui-monospace, monospace;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 2px solid var(--accent);
  border-radius: 0;
  text-decoration: none;
  cursor: pointer;
  box-shadow: var(--shadow-pixel-deep);
  transition: transform 0.14s ease, box-shadow 0.14s ease, background 0.14s ease;
}

.btn-secondary:hover,
.btn-secondary:focus-visible {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--accent-deep);
  background: rgba(231, 129, 255, 0.07);
  color: var(--accent);
}

.btn-sm {
  padding: 0.55rem 0.95rem;
  font-size: 0.7rem;
}
```

- [ ] **Step 4: Verify build + check.**

Run: `npx svelte-check`
Expected: 0 errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Visual check.** Run `npm run dev`, open the site. Hero "View Portfolio" should be solid magenta with a hard purple offset shadow that "presses in" on hover; "Learn More" should be a bordered ghost button. Both square.

- [ ] **Step 6: Commit.**

```bash
git add src/app.css
git commit -m "style(crt): solid press-in buttons and square skip link"
```

---

## Task 4: Square + pixel-shadow the surfaces (filters, portfolio, social, blog, contact, inputs, lightbox, prose)

**Files:**
- Modify: `src/app.css` — multiple rules across the file.

- [ ] **Step 1: Filter buttons.** Replace the `.filter-btn`, `.filter-btn:hover, .filter-btn:focus-visible`, and `.filter-btn.active` rules (lines ~604-629) with:

```css
.filter-btn {
  padding: 0.55rem 1.1rem;
  font-family: 'VCR OSD Mono', ui-monospace, monospace;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--border-mid);
  border-radius: 0;
  cursor: pointer;
  transition: all 0.15s ease;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.filter-btn:hover,
.filter-btn:focus-visible {
  color: var(--text);
  border-color: var(--accent);
}

.filter-btn.active {
  background: var(--accent);
  color: var(--ink);
  border-color: var(--accent);
  box-shadow: 2px 2px 0 var(--accent-dim);
}
```

- [ ] **Step 2: Portfolio items.** Replace the `.portfolio-item` rule and its `:hover, :focus-visible` rule (lines ~492-518) with:

```css
.portfolio-item {
  position: relative;
  border-radius: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  cursor: pointer;
  aspect-ratio: 3/4;
  background: var(--surface);
  box-shadow: var(--shadow-pixel-dark);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.portfolio-item:hover,
.portfolio-item:focus-visible {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 var(--accent-deep);
  border-color: var(--accent);
}
```

- [ ] **Step 3: Portfolio expand badge.** Replace the `.portfolio-expand` rule (lines ~565-580) with (square, accent block, pixel shadow):

```css
.portfolio-expand {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 34px;
  height: 34px;
  border-radius: 0;
  background: var(--accent);
  color: var(--ink);
  box-shadow: 2px 2px 0 var(--accent-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  transition: transform 0.25s cubic-bezier(0.23, 1, 0.32, 1);
}
```

(Leave the `.portfolio-item:hover .portfolio-expand, ...:focus-visible .portfolio-expand { transform: scale(1); }` rule unchanged.)

- [ ] **Step 4: Social icons.** Replace the `.social-icon` and `.social-icon:hover, :focus-visible` rules (lines ~648-670) with:

```css
.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 0;
  border: 1px solid var(--border-mid);
  background: var(--surface);
  color: var(--muted);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.16s ease;
}

.social-icon:hover,
.social-icon:focus-visible {
  border-color: var(--accent);
  color: var(--accent);
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0 var(--accent-dim);
}
```

- [ ] **Step 5: Contact card.** Replace the `.contact-card` rule (lines ~632-639) with:

```css
.contact-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border-mid);
  border-radius: 0;
  padding: 4rem 2rem;
  overflow: hidden;
  box-shadow: inset 0 0 40px rgba(231, 129, 255, 0.05);
}
```

(Leave the `@media (min-width: 768px) .contact-card { padding: 6rem 4rem; }` rule unchanged.)

- [ ] **Step 6: Admin input.** In `.admin-input` change `border-radius: 0.5rem;` to `border-radius: 0;`. Replace the `.admin-input:focus` rule with:

```css
.admin-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: var(--shadow-pixel-deep);
}
```

- [ ] **Step 7: Blog card.** Replace the `.blog-card`, `.blog-card::before`, `.blog-card:hover, :focus-visible`, and `.blog-card:hover::before, :focus-visible::before` rules (lines ~806-845) with (drop the gradient-border `::before`, use a pixel hover):

```css
.blog-card {
  display: block;
  position: relative;
  padding: 1.75rem 1.75rem 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0;
  text-decoration: none;
  color: inherit;
  box-shadow: var(--shadow-pixel-dark);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.blog-card:hover,
.blog-card:focus-visible {
  transform: translate(-2px, -2px);
  border-color: var(--accent);
  box-shadow: 5px 5px 0 var(--accent-deep);
}

.blog-card:hover h3,
.blog-card:focus-visible h3 {
  color: var(--accent);
}
```

- [ ] **Step 8: Square the lightbox + prose surfaces.** Make these radius edits:
  - `.lightbox-image`: `border-radius: 8px;` → `border-radius: 0;`
  - `.lightbox-close`: `border-radius: 50%;` → `border-radius: 0;`
  - `.lightbox-nav`: `border-radius: 50%;` → `border-radius: 0;`
  - `.prose-blog blockquote`: `border-radius: 0 0.5rem 0.5rem 0;` → `border-radius: 0;`
  - `.prose-blog code`: `border-radius: 0.25rem;` → `border-radius: 0;`
  - `.prose-blog pre`: `border-radius: 0.5rem;` → `border-radius: 0;`
  - `.prose-blog img`: `border-radius: 0.5rem;` → `border-radius: 0;`

- [ ] **Step 9: Verify build + check.**

Run: `npx svelte-check`
Expected: 0 errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 10: Visual check.** In `npm run dev`: portfolio tiles are square with a dark pixel shadow and lift up-left with a deep-purple offset shadow on hover; filter "All" active = solid magenta with pixel shadow; social icons square; contact card square; blog cards (scroll to Blog) square with pixel shadow.

- [ ] **Step 11: Commit.**

```bash
git add src/app.css
git commit -m "style(crt): square corners and pixel shadows across surfaces"
```

---

## Task 5: Square pixel avatar in the hero

**Files:**
- Modify: `src/app.css` — avatar rules (lines ~255-315).
- Modify: `src/lib/Hero.svelte:13-21` (avatar markup).

- [ ] **Step 1: Replace the avatar CSS.** Remove the `.avatar-container`, its two `@media` size overrides, `.avatar-container::before`, `.avatar-container::after`, `@keyframes avatarRingSpin`, and `.avatar-img` rules (lines ~255-315) and replace the whole block with:

```css
/* ===== Avatar ===== */
.avatar-frame {
  width: 220px;
  height: 220px;
  border: 2px solid var(--accent);
  box-shadow: var(--shadow-pixel-deep);
  background: var(--surface);
  position: relative;
}

@media (min-width: 768px) {
  .avatar-frame {
    width: 280px;
    height: 280px;
  }
}

@media (min-width: 1024px) {
  .avatar-frame {
    width: 300px;
    height: 300px;
  }
}

.avatar-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.35);
  pointer-events: none;
}
```

- [ ] **Step 2: Update the hero markup.** In `src/lib/Hero.svelte`, replace the avatar block (currently lines 13-21):

```svelte
      <div class="flex-shrink-0 order-2 lg:order-1">
        <div class="avatar-container">
          <img
            src={artfightIcon}
            alt="Jordan (Sparrow) Matchan"
            class="avatar-img"
          />
        </div>
      </div>
```

with:

```svelte
      <div class="flex-shrink-0 order-2 lg:order-1">
        <div class="avatar-frame">
          <img src={artfightIcon} alt="Jordan (Sparrow) Matchan" />
        </div>
      </div>
```

- [ ] **Step 3: Verify no stale references.**

Run: `grep -rn "avatar-container\|avatar-img\|avatarRingSpin" src/`
Expected: **no matches.**

- [ ] **Step 4: Verify build + check.**

Run: `npx svelte-check`
Expected: 0 errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Visual check.** Hero avatar is now a square frame with a 2px magenta border, a deep-purple pixel offset shadow, and an inset darkening — no spinning ring.

- [ ] **Step 6: Commit.**

```bash
git add src/app.css src/lib/Hero.svelte
git commit -m "style(crt): square pixel avatar frame in hero"
```

---

## Task 6: Typing wordmark + blinking cursor (nav + footer)

**Files:**
- Modify: `src/app.css` — `.wordmark` rule (lines ~27-38) + add `.wm-suffix`, `.cursor`, `@keyframes blink`.
- Modify: `src/lib/Navbar.svelte` (script + wordmark markup).
- Modify: `src/lib/Footer.svelte:19` (wordmark markup).

- [ ] **Step 1: Replace the `.wordmark` CSS** (the current deep-purple + cyan text-shadow rule, lines ~27-38) with:

```css
/* Brand wordmark: CRT treatment with typed suffix + blinking caret */
.wordmark {
  color: var(--text);
  display: inline-flex;
  align-items: baseline;
}

.wm-suffix {
  color: var(--accent);
  white-space: pre;
}

.wordmark .cursor {
  display: inline-block;
  width: 0.5ch;
  height: 1em;
  background: var(--accent);
  margin-left: 4px;
  transform: translateY(0.12em);
  animation: blink 1.1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
```

- [ ] **Step 2: Update the Navbar script.** In `src/lib/Navbar.svelte`, the `<script>` currently imports and sets up scroll + IntersectionObserver in `onMount`. Add the typing controller inside the SAME `onMount` return-cleanup pattern. Replace the entire `<script>` block with:

```svelte
<script>
  import { onMount } from 'svelte';
  import { Menu } from 'lucide-svelte';
  import logo from '../assets/logo.svg';

  let { onOpenMobileMenu } = $props();

  let scrolled = $state(false);
  let activeSection = $state('hero');
  let suffix = $state('');
  let caretBlinking = $state(true);

  const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  onMount(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', onScroll);

    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeSection = entry.target.id;
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => obs.observe(s));

    // Typing wordmark: "RETRO" -> types " INSOMNIUM" -> holds -> erases -> loops.
    const word = ' INSOMNIUM'; // leading nbsp = space after "RETRO"
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer;
    if (reduce) {
      suffix = word;
      caretBlinking = true;
    } else {
      const TYPE = 115, ERASE = 70, HOLD_FULL = 2400, HOLD_EMPTY = 1800;
      let i = 0;
      const type = () => {
        caretBlinking = false;
        i++;
        suffix = word.slice(0, i);
        if (i < word.length) timer = setTimeout(type, TYPE);
        else { caretBlinking = true; timer = setTimeout(erase, HOLD_FULL); }
      };
      const erase = () => {
        caretBlinking = false;
        i--;
        suffix = word.slice(0, i);
        if (i > 0) timer = setTimeout(erase, ERASE);
        else { caretBlinking = true; timer = setTimeout(type, HOLD_EMPTY); }
      };
      timer = setTimeout(type, HOLD_EMPTY);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
      clearTimeout(timer);
    };
  });
</script>
```

- [ ] **Step 3: Update the Navbar wordmark markup.** Replace the wordmark `<span>` (currently line 51):

```svelte
      <span class="wordmark font-display text-3xl md:text-4xl font-bold tracking-wider">Retro Insomnium</span>
```

with:

```svelte
      <span class="wordmark font-display text-3xl md:text-4xl font-bold tracking-wider">RETRO<span class="wm-suffix">{suffix}</span><span class="cursor" class:blink={caretBlinking}></span></span>
```

- [ ] **Step 4: Make the caret blink toggle real.** The `.cursor` CSS in Step 1 always animates. Update it so blinking is class-driven. In `src/app.css`, change the `.wordmark .cursor` rule's `animation` line: remove `animation: blink 1.1s steps(1) infinite;` from the base rule, and add a separate rule:

```css
.wordmark .cursor.blink {
  animation: blink 1.1s steps(1) infinite;
}
```

So the base `.wordmark .cursor` keeps only the box styles (display/width/height/background/margin/transform), and `.blink` adds the animation. This makes the caret solid (steady) while typing/erasing and blinking while held — matching the design.

- [ ] **Step 5: Update the Footer wordmark markup (static, no typing).** In `src/lib/Footer.svelte`, replace the wordmark span (line 19):

```svelte
          <span class="wordmark font-display text-2xl font-bold tracking-wider">Retro Insomnium</span>
```

with:

```svelte
          <span class="wordmark font-display text-2xl font-bold tracking-wider">RETRO<span class="wm-suffix">&nbsp;INSOMNIUM</span></span>
```

- [ ] **Step 6: Verify build + check.**

Run: `npx svelte-check`
Expected: 0 errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 7: Visual check.** In `npm run dev`: nav wordmark shows "RETRO", types " INSOMNIUM" letter by letter, holds, erases, loops; the magenta caret is steady while typing and blinks while held. Footer shows static "RETRO INSOMNIUM" with the accent suffix, no caret.

- [ ] **Step 8: Reduced-motion check.** In browser devtools, emulate `prefers-reduced-motion: reduce` and reload. The nav wordmark should show the full static "RETRO INSOMNIUM" (no typing loop); the caret may show but should not animate (Task 7 confirms this).

- [ ] **Step 9: Commit.**

```bash
git add src/app.css src/lib/Navbar.svelte src/lib/Footer.svelte
git commit -m "style(crt): typing RETRO->INSOMNIUM wordmark with blinking caret"
```

---

## Task 7: Reduced-motion guards + final sweep

**Files:**
- Modify: `src/app.css` — the `@media (prefers-reduced-motion: reduce)` block near the end.

- [ ] **Step 1: Add CRT-specific reduced-motion guards.** Inside the existing `@media (prefers-reduced-motion: reduce) { ... }` block (the one near the end of `app.css`), add these rules (alongside the existing global animation/transition disabling — note the global `*` rule already neutralizes most transitions, but add explicit caret + portfolio rules for clarity and to match the design):

```css
  .wordmark .cursor,
  .wordmark .cursor.blink {
    animation: none;
  }

  .portfolio-item {
    transition: none;
  }
```

(Confirm the `.cursor-glow { display: none; }` line was already removed in Task 1 Step 4 — it should no longer be in this block.)

- [ ] **Step 2: Full reference sweep.**

Run: `grep -rn "cursor-glow\|noise-overlay\|CursorGlow\|avatar-container\|avatar-img\|avatarRingSpin\|border-radius: 12px\|border-radius: 16px" src/`
Expected: **no matches** (the only radius values left in `src/app.css` should be `0`, plus the `border-radius: 999px`/`50%` you intentionally squared in Task 4 — re-grep `border-radius` to confirm only `0` remains for component surfaces).

Run: `grep -rn "border-radius" src/app.css`
Expected: every match is `border-radius: 0;` (any remaining non-zero radius is a miss — fix it).

- [ ] **Step 3: Final build + check.**

Run: `npx svelte-check`
Expected: 0 errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Full visual walkthrough.** In `npm run dev`, scroll the whole page and visit `#/admin` and a blog post (`#/blog/<slug>`):
  - Scanlines + faint grid + vignette visible site-wide.
  - No cursor-follow glow.
  - Square corners + pixel shadows on every card, button, input, social icon, lightbox control.
  - Hero avatar = square pixel frame; primary buttons solid magenta press-in.
  - Wordmark typing loop works; reduced-motion shows static wordmark.
  - Lightbox opens from a portfolio tile and is square.
  - No console errors.

- [ ] **Step 5: Commit.**

```bash
git add src/app.css
git commit -m "style(crt): reduced-motion guards for caret and portfolio hover"
```

---

## Self-review notes (author)

- **Spec coverage:** tokens/atmosphere (T1), drop glow+noise (T2), buttons (T3), surfaces squared (T4), avatar (T5), wordmark (T6), reduced-motion (T7) — every spec "Changes by file" item maps to a task.
- **Type/name consistency:** CSS var names (`--ink`, `--accent-deep`, `--shadow-pixel*`) are defined in T1 and reused verbatim in T3-T6. Markup class names (`.avatar-frame`, `.wm-suffix`, `.cursor`, `.blink`) defined in CSS tasks match the component edits.
- **No unit tests** by design — repo has none; gates are build + svelte-check + grep + visual.
