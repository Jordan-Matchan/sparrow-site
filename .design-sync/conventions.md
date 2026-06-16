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

Accent gradient (buttons, active states): `linear-gradient(135deg, #E781FF, #922AB1)`
Glow shadows: `0 8px 30px rgba(76,14,97,0.5)` (button glow), `0 4px 20px rgba(231,129,255,0.1)` (soft glow)

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
- `.btn-primary` — gradient accent pill; uppercase VCR Mono; add `gap-2` for icon+text
- `.btn-secondary` — transparent + border; accent glow on hover
- `.filter-btn` — rounded pill filter toggle; add `.active` for selected state

**Cards & Surfaces:**
- `.blog-card` — gradient glass card with hover lift + accent border glow
- `.contact-card` — dark surface card (`bg-surface`) with border
- `.social-icon` — 44×44px square icon button with hover accent

**Navigation:**
- `.nav-link` — underline reveal on hover; add `.active` for current page

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
