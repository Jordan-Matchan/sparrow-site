# Sparrow Design Language — Conventions

## Aesthetic & Wrapping

**No provider/wrapper needed.** This is a CSS-only design language (no React component library). Import `styles.css` to get fonts, tokens, and component classes. The design agent applies classes directly to HTML elements.

Background every screen in `#0c0613` (`bg-bg`) — the design only looks right on a deep near-black purple ground. Without it, all the tints and glows look wrong.

## Color Vocabulary

The palette is a cool dark purple + bright magenta accent + pale cyan highlight.

| Tailwind class | Hex | Use |
|---|---|---|
| `bg-bg` | `#0c0613` | Page background (always) |
| `bg-surface` | `#160a20` | Cards, modals, nav |
| `bg-surfaceLight` | `#22102e` | Code blocks, nested cards |
| `text-accent` | `#E781FF` | Primary accent — links, headings, active states |
| `text-accentDim` | `#922AB1` | Gradient endpoint, hover darks |
| `text-warm` | `#C9F6FF` | Highlight, strong text, cyan contrast |
| `text-textPrimary` | `#E8F0F5` | Body text |
| `text-textSecondary` | `#A98DC0` | Muted text, placeholders, secondary labels |
| `border-border` | `#3a1d4d` | Borders, dividers |

Shadow inks (never text): `#922AB1` (`--accent-dim`) and `#4C0E61` (`--accent-deep`). Label on an accent fill: `#18061f` (`--ink`).

## Shape and depth (CRT Revival)

Every corner is square (`border-radius: 0`). Depth is a hard pixel offset, never a blur:
`3px 3px 0 #922AB1` (primary button), `4px 4px 0 #4C0E61` (secondary button, avatar frame, focused input),
`4px 4px 0 rgba(0,0,0,0.45)` (cards and image frames at rest), `5px 5px 0 #4C0E61` (card hover, with an accent border).
Hover lifts a card 2px up-left; a button presses 2px down-right onto `1px 1px 0 #922AB1`, then flat on active.
The page ground is `#0c0613` with a 7px pixel grid (`rgba(231,129,255,0.022)` lines), fixed scanlines
(2px clear / 1px `rgba(0,0,0,0.14)`, multiply) and an `inset 0 0 160px rgba(0,0,0,0.55)` vignette.

## Typography

Two fonts only — no system fonts for branded content:

- **Grape Soda** (`font-display`, `font-family: 'Grape Soda', sans-serif`) — headings, wordmarks, titles, nav links. Gives the display text personality.
- **VCR OSD Mono** (`font-body`, `font-family: 'VCR OSD Mono', monospace`) — all body text, labels, buttons, inputs. Monospace is intentional — the technical, deliberate feel is the brand.

Typography scale:
- `text-5xl` + Grape Soda = hero display
- `text-4xl`/`text-3xl` + Grape Soda + `text-accent` = section headings
- `text-xl`/`text-2xl` + Grape Soda = card/section subheadings
- `text-base` + VCR OSD Mono = body
- `text-sm` + VCR OSD Mono + `text-textSecondary` = secondary/muted
- `text-xs` + VCR OSD Mono + `uppercase tracking-widest` = micro labels

Heading gradient (hero): `background: linear-gradient(135deg, #E8F0F5 0%, #E8F0F5 70%, #E781FF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`

## Reusable CSS Classes

These are defined in `styles.css` and ready to use:

**Buttons:**
- `.btn-primary` — solid accent on ink, 2px accent border, pixel shadow, press-in hover; uppercase VCR Mono; `.btn-sm` for compact
- `.btn-secondary` — transparent, 2px accent border, deep pixel shadow, press-in hover
- `.filter-btn` — square filter toggle; `.active` = accent fill on ink with a 2px pixel shadow

**Cards & Surfaces:**
- `.blog-card` — square surface card with a pixel shadow; hover lifts it up-left onto a deep pixel shadow with an accent border
- `.contact-card` — square surface panel, `border-mid` edge, faint inset accent wash
- `.social-icon` — 44×44px square icon button; hover accent edge + pixel shadow
- `.avatar-frame` — square 2px accent frame with inset vignette and deep pixel shadow
- `.portfolio-item` — square image tile, pixel shadow, hover lift + overlay caption + expand badge

**Navigation:**
- `.nav-link` — underline reveal on hover; add `.active` for current page
- `.wordmark` + `.wm-suffix` + `.cursor.blink` — RETRO + typed accent suffix + blinking caret

**Forms:**
- `.admin-input` — full-width text input; accent border on focus

**Content:**
- `.prose-blog` — markdown prose styles (headings, links, code, blockquote)

## Idiomatic Build Example

```html
<div style="background:#0c0613; padding:4rem 2rem; font-family:'VCR OSD Mono',monospace;">
  <h1 style="font-family:'Grape Soda',sans-serif; font-size:3rem; color:#E8F0F5; margin-bottom:1rem;">
    Portfolio
  </h1>
  <p style="color:#A98DC0; font-size:0.95rem; margin-bottom:2rem;">
    Creative work · design · code · 3D
  </p>
  <div style="display:flex; gap:1rem; flex-wrap:wrap;">
    <button class="btn-primary">View All Work</button>
    <button class="btn-secondary">Contact Me</button>
  </div>
</div>
```

For the agent's own layout glue (padding, gap, grid), use Tailwind utilities. For branded content, use the CSS classes above.
