<script>
  import { ArrowLeft } from 'lucide-svelte';
  import { getPost, formatDate } from './posts.js';

  let { slug } = $props();

  let post = $derived(getPost(slug));
</script>

<section id="blog-post" class="relative py-24 md:py-32 min-h-screen">
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none"></div>
  <div class="relative max-w-3xl mx-auto px-6">
    <a href="#blog" class="inline-flex items-center gap-2 text-textSecondary hover:text-accent transition-colors mb-8">
      <ArrowLeft class="w-4 h-4" /> Back to blog
    </a>

    {#if post}
      <article>
        <header class="mb-10">
          <span class="text-xs font-medium tracking-[0.25em] uppercase text-accent block mb-3">
            {formatDate(post.date)}
          </span>
          <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {post.title}
          </h1>
        </header>

        <div class="prose-blog">
          {@html post.html}
        </div>
      </article>
    {:else}
      <div class="text-center py-16">
        <h1 class="font-display text-3xl mb-4">Post not found</h1>
        <p class="text-textSecondary">The post "{slug}" doesn't exist.</p>
      </div>
    {/if}
  </div>
</section>
