# Retro Insomnium — Sparrow Matchan's portfolio site

The personal portfolio + blog site for **Jordan (Sparrow) Matchan** — a freelance 2D & 3D
artist working on stylised art and models for games. The site covers character design,
concept design, environment design, 3D texturing and VFX, and includes a small file-based
blog.

Live site: <https://jordan-matchan.github.io/sparrow-site/>

## What's on the site

- **Hero / About** — intro, focus areas, and a short bio.
- **Portfolio** — curated gallery of character art, illustration, environment and 3D work.
- **Blog** — monthly-ish posts, written in Markdown and committed to this repo.
- **Contact** — how to get in touch / commission work.
- **Studio (`/#/admin`)** — a private-bookmark page for the author to draft new blog posts
  (see below).

## Tech stack

- [Svelte 5](https://svelte.dev/) (runes mode) + [Vite](https://vitejs.dev/) — SPA, no SSR.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [`marked`](https://marked.js.org/) for Markdown rendering.
- Hash-based client routing (`#/blog/<slug>`, `#/admin`) so the site works on plain static
  hosting with no rewrite rules.
- Hosted on **GitHub Pages**, deployed via GitHub Actions on push to `main`.

## Author bookmark — the Studio page

The site has a hidden author page at:

**<https://jordan-matchan.github.io/sparrow-site/#/admin>**

> Bookmark this URL. It is intentionally **not linked from the site UI** — there is no
> button, footer link, or nav entry pointing to it.

The page is safe to leave public: it doesn't write anything itself. It just builds a
prefilled link to GitHub's web editor for a new post in `src/content/blog/`. Anyone
without push access to this repo will simply see GitHub's "fork & propose change" flow,
so nothing can be published without the maintainer's GitHub account.

The same page also lists existing posts and links straight to GitHub's edit view for each.

## Blog (file-based CMS)

Each `.md` file in `src/content/blog/` is a blog post. Drop a new file in, push to `main`,
and it shows up on the site automatically — no rebuild config needed beyond the standard
deploy.

### Filename convention

```
YYYY-MM-DD-some-slug.md
```

The filename date prefix is only for sorting on disk; the **published date** comes from
the `date:` frontmatter field.

### Frontmatter

Every post must start with a YAML frontmatter block:

```md
---
title: My Post Title
date: 2025-11-02
slug: my-post-slug
excerpt: One- or two-sentence preview shown on the blog list page.
---

Markdown body goes here…
```

| Field     | Required | Notes                                                          |
| --------- | -------- | -------------------------------------------------------------- |
| `title`   | yes      | Display title.                                                 |
| `date`    | yes      | ISO `YYYY-MM-DD`. Used for sorting (newest first) and display. |
| `slug`    | yes      | URL fragment, lowercase-with-dashes. Used in `#/blog/<slug>`.  |
| `excerpt` | no       | Card preview text. Falls back to first paragraph if omitted.   |

### Body

Standard Markdown — headings, lists, links, bold/italic, code, blockquotes, images. Posts
are rendered with [marked](https://marked.js.org/).

To add an image, put it in `src/assets/` and reference it as a relative path (Vite will
hash + bundle it):

```md
![alt text](/src/assets/my-image.webp)
```

### How it works

`src/lib/posts.js` uses Vite's `import.meta.glob` to bundle every `.md` file in
`src/content/blog/` at build time, parses the frontmatter, and exposes `getPosts()` /
`getPost(slug)`. New posts ship with the next `pnpm build`.

## Local development

```bash
pnpm install
pnpm dev       # start the Vite dev server
pnpm build     # production build into dist/
pnpm preview   # preview the production build locally
```

Helper scripts under `scripts/`:

- `download-images.mjs` — fetch / refresh portfolio source images.
- `make-favicons.mjs` — regenerate the favicon set in `public/`.

## Project structure

```
src/
  App.svelte           — top-level route switch (hero / blog / post / admin)
  main.js              — app entry
  app.css              — Tailwind layers + custom styles
  assets/              — fonts and bundled images
  content/blog/        — Markdown blog posts (the file-based CMS)
  lib/
    Hero.svelte        — landing section
    About.svelte       — about + skills
    Portfolio.svelte   — gallery
    Blog.svelte        — blog list
    BlogPost.svelte    — single post view
    Contact.svelte     — contact section
    Footer.svelte      — site footer
    Navbar.svelte      — top nav
    MobileMenu.svelte  — mobile drawer
    Lightbox.svelte    — portfolio image lightbox
    CursorGlow.svelte  — cursor effect
    Admin.svelte       — Studio / new-post helper (no link from UI; bookmark only)
    portfolioData.js   — portfolio entries
    posts.js           — blog frontmatter + Markdown loader
public/                — static assets copied as-is (favicons, manifest)
scripts/               — image / favicon build helpers
```

## License

See [LICENSE](LICENSE).
