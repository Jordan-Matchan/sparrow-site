import { marked } from 'marked';

// Vite glob: bundles every .md file in src/content/blog as a raw string at build time.
const files = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

marked.setOptions({ gfm: true, breaks: false });

/**
 * Tiny YAML-ish frontmatter parser. Supports `key: value` lines only — good
 * enough for our post metadata, no quoting/lists needed.
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return { data, body: match[2] };
}

const posts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const fallbackSlug = path
      .split('/')
      .pop()
      .replace(/\.md$/, '')
      .replace(/^\d{4}-\d{2}-\d{2}-/, '');
    const slug = data.slug || fallbackSlug;
    const excerpt =
      data.excerpt ||
      body
        .replace(/^#.*$/gm, '')
        .trim()
        .split(/\r?\n\r?\n/)[0]
        .slice(0, 200);
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt,
      body,
      html: marked.parse(body),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPosts() {
  return posts;
}

export function getPost(slug) {
  return posts.find((p) => p.slug === slug) || null;
}

export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
