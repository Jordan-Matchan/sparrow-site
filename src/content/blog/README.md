# Blog (file-based CMS)

Each `.md` file in this folder is a blog post. Drop a new file in, and it shows up on the site automatically — no rebuild config needed.

## Filename convention

```
YYYY-MM-DD-some-slug.md
```

The filename date prefix is only for sorting on disk; the **published date** comes from the `date:` frontmatter field.

## Frontmatter

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

| Field     | Required | Notes                                                            |
| --------- | -------- | ---------------------------------------------------------------- |
| `title`   | yes      | Display title.                                                   |
| `date`    | yes      | ISO `YYYY-MM-DD`. Used for sorting (newest first) and display.   |
| `slug`    | yes      | URL fragment, lowercase-with-dashes. Used in `#/blog/<slug>`.    |
| `excerpt` | no       | Card preview text. Falls back to first paragraph if omitted.     |

## Body

Standard markdown — headings, lists, links, bold/italic, code, blockquotes, images. Posts are rendered with [marked](https://marked.js.org/).

To add an image, put it in `src/assets/` and reference it as a relative path (Vite will hash + bundle it):

```md
![alt text](/src/assets/my-image.webp)
```

## How it works

`src/lib/posts.js` uses Vite's `import.meta.glob` to bundle all `.md` files at build time, parses the frontmatter, and exposes `getPosts()` / `getPost(slug)`. New posts ship with the next `pnpm build`.
