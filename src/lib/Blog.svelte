<script>
  import { onMount } from 'svelte';
  import { ArrowRight } from 'lucide-svelte';
  import { getPosts, formatDate } from './posts.js';

  const posts = getPosts();

  let section;
  onMount(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    section?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
</script>

<section id="blog" class="relative py-24 md:py-32" bind:this={section}>
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none"></div>
  <div class="relative max-w-5xl mx-auto px-6">
    <div class="text-center mb-16">
      <span class="text-xs font-medium tracking-[0.3em] uppercase text-accent mb-4 block">Blog</span>
      <h2 class="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        Monthly <span class="text-accent">Dispatches</span>
      </h2>
      <p class="text-textSecondary max-w-lg mx-auto">
        What I've been working on, playing, watching and reading.
      </p>
    </div>

    <div class="flex flex-col gap-6">
      {#each posts as post, i (post.slug)}
        <a
          href={`#/blog/${post.slug}`}
          class="blog-card reveal"
          style:transition-delay={`${i * 0.08}s`}
        >
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium tracking-[0.25em] uppercase text-textSecondary">
              {formatDate(post.date)}
            </span>
            <h3 class="font-display text-2xl md:text-3xl font-bold text-textPrimary group-hover:text-accent transition-colors">
              {post.title}
            </h3>
            <p class="text-textSecondary leading-relaxed">{post.excerpt}</p>
            <span class="inline-flex items-center gap-2 text-accent font-medium mt-2">
              Read post <ArrowRight class="w-4 h-4" />
            </span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
