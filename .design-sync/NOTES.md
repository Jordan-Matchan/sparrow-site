# Design Sync Notes — sparrow-site

## Context

This is a **tokens-only / style-guide sync** — not a React component library. `sparrow-site` is a Svelte 5 personal portfolio website. The sync was chosen to make the Sparrow visual language (colors, fonts, CSS patterns) available in claude.ai/design for creating matching visual work.

The standard converter (`package-build.mjs`) does NOT apply here — this repo is Svelte, not React, and has no npm-exported component library. The `ds-bundle/` was hand-crafted.

## What was synced

- `styles.css` → @font-face + token CSS variables + @imports `_ds_bundle.css`
- `tokens/tokens.css` → CSS custom properties for all design tokens
- `_ds_bundle.css` → all component CSS classes from `src/app.css`
- `fonts/GrapeSoda.ttf` + `fonts/VCR_OSD_MONO.ttf` → copied from `src/assets/fonts/`
- `components/Brand/Colors/Colors.html` → color palette preview card
- `components/Brand/Typography/Typography.html` → font specimen card
- `components/UI/Buttons/Buttons.html` → button styles card
- `components/UI/Surfaces/Surfaces.html` → blog-card, contact-card, input card

## Re-sync instructions

There is no automated build. To update the sync after changing `src/app.css` or `tailwind.config.js`:

1. Manually update the relevant files in `ds-bundle/`:
   - `_ds_bundle.css` ← reflects `src/app.css` component classes
   - `tokens/tokens.css` ← reflects `tailwind.config.js` theme colors
2. Run design-sync again — it will pick up the existing project from `config.json`

## Re-sync risks

- **CSS drift**: `_ds_bundle.css` and `tokens/tokens.css` are hand-copies of the source; they'll silently desync when `src/app.css` or `tailwind.config.js` changes. No automation catches this.
- **Font changes**: If fonts are swapped or renamed, `ds-bundle/fonts/` and the `@font-face` declarations in `styles.css` need manual updates.
- **`_ds_sync.json` is a stub**: The sync anchor has `"handcrafted"` hashes, so every re-sync will re-verify everything (no diff skip). This is intentional and safe.
- **No automated component discovery**: Preview cards are static HTML; new UI patterns added to the site won't appear until someone adds a new card manually.
