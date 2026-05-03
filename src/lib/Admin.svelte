<script>
  import { onMount } from 'svelte';
  import { ArrowLeft, ExternalLink, FilePlus, Pencil } from 'lucide-svelte';
  import { getPosts, formatDate } from './posts.js';

  const REPO = 'Mooshieblob1/sparrow-site';
  const BRANCH = 'main';
  const BLOG_DIR = 'src/content/blog';

  const posts = getPosts();

  let title = $state('');
  let excerpt = $state('');
  let date = $state(new Date().toISOString().slice(0, 10));

  function slugify(s) {
    return s
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  let slug = $derived(slugify(title));
  let filename = $derived(slug ? `${date}-${slug}.md` : '');

  let template = $derived(
    [
      '---',
      `title: ${title || 'Untitled'}`,
      `date: ${date}`,
      `slug: ${slug || 'untitled'}`,
      `excerpt: ${excerpt || ''}`,
      '---',
      '',
      "Write your post here using markdown. A few quick reminders:",
      '',
      '- Use `## Heading` for section breaks.',
      '- `**bold**`, `*italic*`, `[link](https://example.com)`.',
      '- Lists with `-`, blockquotes with `>`.',
      '- Save the file in GitHub when done — the site will rebuild automatically.',
      '',
    ].join('\n')
  );

  let createUrl = $derived(
    title
      ? `https://github.com/${REPO}/new/${BRANCH}/${BLOG_DIR}` +
          `?filename=${encodeURIComponent(filename)}` +
          `&value=${encodeURIComponent(template)}`
      : ''
  );

  function editPostUrl(post) {
    // Try the canonical filename pattern first; if it doesn't exist GitHub
    // will show a 404 and Sparrow can navigate from the blog folder listing.
    const fname = `${post.date}-${post.slug}.md`;
    return `https://github.com/${REPO}/edit/${BRANCH}/${BLOG_DIR}/${fname}`;
  }

  const folderUrl = `https://github.com/${REPO}/tree/${BRANCH}/${BLOG_DIR}`;
  const actionsUrl = `https://github.com/${REPO}/actions`;

  let copied = $state(false);
  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(template);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch (_) {
      // Clipboard may be blocked; ignore.
    }
  }
</script>

<section id="admin" class="relative py-24 md:py-32 min-h-screen">
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none"></div>
  <div class="relative max-w-3xl mx-auto px-6">
    <a href="#hero" class="inline-flex items-center gap-2 text-textSecondary hover:text-accent transition-colors mb-8">
      <ArrowLeft class="w-4 h-4" /> Back to site
    </a>

    <header class="mb-10">
      <span class="text-xs font-medium tracking-[0.25em] uppercase text-accent block mb-3">Studio</span>
      <h1 class="font-display text-4xl md:text-5xl font-bold tracking-tight mb-3">Write a new post</h1>
      <p class="text-textSecondary leading-relaxed">
        This page builds a prefilled link to GitHub's editor. You stay signed in to GitHub the
        normal way — anyone without write access to the repo just sees a "fork &amp; propose
        change" screen, so this admin is safe to leave public.
      </p>
    </header>

    <div class="space-y-5 mb-10">
      <label class="block" for="admin-title">
        <span class="text-xs font-medium tracking-[0.2em] uppercase text-textSecondary block mb-2">
          Title
        </span>
        <input
          id="admin-title"
          name="title"
          type="text"
          bind:value={title}
          placeholder="Monthly Blog Post November 2026"
          class="admin-input"
        />
      </label>

      <label class="block" for="admin-date">
        <span class="text-xs font-medium tracking-[0.2em] uppercase text-textSecondary block mb-2">
          Date
        </span>
        <input id="admin-date" name="date" type="date" bind:value={date} class="admin-input" />
      </label>

      <label class="block" for="admin-excerpt">
        <span class="text-xs font-medium tracking-[0.2em] uppercase text-textSecondary block mb-2">
          Excerpt <span class="text-textSecondary/60 normal-case tracking-normal">(optional, shows on the blog list)</span>
        </span>
        <textarea
          id="admin-excerpt"
          name="excerpt"
          bind:value={excerpt}
          rows="2"
          placeholder="One or two sentences summarising the post."
          class="admin-input resize-none"
        ></textarea>
      </label>

      {#if filename}
        <div class="text-xs text-textSecondary">
          Will create <code class="text-accent">{BLOG_DIR}/{filename}</code> on branch <code class="text-accent">{BRANCH}</code>.
        </div>
      {/if}

      <div class="flex flex-wrap gap-3">
        {#if createUrl}
          <a class="btn-primary" href={createUrl} target="_blank" rel="noopener noreferrer">
            <FilePlus class="w-4 h-4" />
            Open editor on GitHub
            <ExternalLink class="w-4 h-4" />
          </a>
        {:else}
          <button class="btn-primary opacity-50 cursor-not-allowed" disabled>
            <FilePlus class="w-4 h-4" />
            Enter a title to continue
          </button>
        {/if}
        <button type="button" class="btn-secondary" onclick={copyTemplate} disabled={!title}>
          {copied ? 'Copied!' : 'Copy template'}
        </button>
      </div>
    </div>

    <hr class="border-border my-10" />

    <h2 class="font-display text-2xl font-bold mb-4">Edit an existing post</h2>
    <p class="text-textSecondary text-sm mb-5">
      Opens that post directly in GitHub's editor. Save and the site will rebuild on its own.
    </p>
    <ul class="space-y-2 mb-10">
      {#each posts as post (post.slug)}
        <li>
          <a
            href={editPostUrl(post)}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between gap-4 p-4 rounded-lg border border-border hover:border-accent hover:bg-surface/60 transition-colors"
          >
            <div class="min-w-0">
              <div class="font-display font-semibold truncate">{post.title}</div>
              <div class="text-xs text-textSecondary mt-0.5">{formatDate(post.date)}</div>
            </div>
            <Pencil class="w-4 h-4 text-accent flex-none" />
          </a>
        </li>
      {/each}
    </ul>

    <div class="text-xs text-textSecondary space-y-1">
      <div>
        <a class="hover:text-accent transition-colors" href={folderUrl} target="_blank" rel="noopener noreferrer">
          Browse the blog folder on GitHub →
        </a>
      </div>
      <div>
        <a class="hover:text-accent transition-colors" href={actionsUrl} target="_blank" rel="noopener noreferrer">
          See the latest deploy run →
        </a>
      </div>
    </div>
  </div>
</section>
