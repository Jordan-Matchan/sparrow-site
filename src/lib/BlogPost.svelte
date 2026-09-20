<script>
  import { ArrowLeft, ArrowRight } from 'lucide-svelte';
  import { getPost, getPosts, formatDate, postNumber } from './posts.js';
  import artfightIcon from '../assets/images/artfight-icon.webp';
  import SectionHead from './SectionHead.svelte';

  let { slug } = $props();

  let post = $derived(getPost(slug));
  let posts = getPosts();
  let others = $derived(posts.filter((p) => p.slug !== slug).slice(0, 3));
  let idx = $derived(posts.findIndex((p) => p.slug === slug));
  let newer = $derived(idx > 0 ? posts[idx - 1] : null);
  let older = $derived(idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : null);
  let readTime = $derived(post ? Math.max(1, Math.round(post.body.split(/\s+/).length / 200)) : 0);
</script>

<section id="blog-post" class="relative pt-40 md:pt-48 pb-24 md:pb-32 min-h-screen">
  <div class="relative max-w-7xl mx-auto px-6 flex flex-col gap-10">
    {#if post}
      <SectionHead num="03" label="Log · dispatch {postNumber(slug)}" note="{formatDate(post.date)} · {readTime} min read" />

      <div class="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-12 lg:gap-24 items-start">
        <article class="flex flex-col gap-10 max-w-3xl">
          <header class="grid md:grid-cols-[200px_minmax(0,1fr)] gap-6 md:gap-10 items-start">
            <span class="font-display text-7xl md:text-[120px] leading-[0.85]" style="color: var(--accent-dim);" aria-hidden="true">{postNumber(slug)}</span>
            <div class="flex flex-col gap-5">
              <h1 class="font-display text-4xl md:text-6xl font-bold leading-[0.98]">
                {post.title}
              </h1>
              {#if post.excerpt}
                <p class="text-textSecondary text-base md:text-lg leading-relaxed">{post.excerpt}</p>
              {/if}
              <span class="mono-tag sm:hidden">{formatDate(post.date)} · {readTime} min read</span>
            </div>
          </header>

          <div class="prose-blog pt-10 border-t border-border">
            {@html post.html}
          </div>

          <nav class="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-border" aria-label="Dispatches">
            {#if older}
              <a href={`#/blog/${older.slug}`} class="btn-secondary btn-sm"><ArrowLeft class="w-4 h-4" /> No. {postNumber(older.slug)}</a>
            {:else}
              <span class="mono-tag">First dispatch</span>
            {/if}
            <span class="mono-tag hidden md:inline">End of dispatch</span>
            {#if newer}
              <a href={`#/blog/${newer.slug}`} class="btn-secondary btn-sm">No. {postNumber(newer.slug)} <ArrowRight class="w-4 h-4" /></a>
            {:else}
              <a href="#blog" class="btn-secondary btn-sm">All dispatches <ArrowRight class="w-4 h-4" /></a>
            {/if}
          </nav>
        </article>

        <aside class="flex flex-col gap-8">
          {#if others.length}
            <div class="bg-surface border p-6 flex flex-col gap-4" style="border-color: var(--border-mid); box-shadow: var(--shadow-pixel-dark);">
              <span class="mono-tag text-accent">&gt; also in the log</span>
              {#each others as o}
                <a href={`#/blog/${o.slug}`} class="grid grid-cols-[56px_minmax(0,1fr)] gap-3 pt-4 border-t border-border items-start group">
                  <span class="font-display text-3xl leading-[0.9]" style="color: var(--accent-dim);" aria-hidden="true">{postNumber(o.slug)}</span>
                  <span class="flex flex-col gap-1.5">
                    <span class="mono-tag">{formatDate(o.date)}</span>
                    <span class="font-display text-lg leading-tight text-textPrimary group-hover:text-accent transition-colors">{o.title}</span>
                  </span>
                </a>
              {/each}
            </div>
          {/if}
          <div class="flex flex-col gap-3 items-start">
            <div class="avatar-frame !w-24 !h-24"><img src={artfightIcon} alt="Jordan (Sparrow) Matchan" /></div>
            <span class="font-display text-lg">Jordan (Sparrow) Matchan</span>
            <span class="text-sm text-textSecondary leading-relaxed">Freelance 2D &amp; 3D artist. One dispatch a month on projects, games, films and books.</span>
            <a href="#contact" class="btn-primary btn-sm">Work with me</a>
          </div>
        </aside>
      </div>
    {:else}
      <a href="#blog" class="inline-flex items-center gap-2 text-textSecondary hover:text-accent transition-colors">
        <ArrowLeft class="w-4 h-4" /> Back to the log
      </a>
      <div class="text-center py-16">
        <h1 class="font-display text-3xl mb-4">Post not found</h1>
        <p class="text-textSecondary">The post "{slug}" doesn't exist.</p>
      </div>
    {/if}
  </div>
</section>
