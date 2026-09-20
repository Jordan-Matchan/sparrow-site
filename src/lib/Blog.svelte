<script>
  import { onMount } from 'svelte';
  import { ArrowRight } from 'lucide-svelte';
  import { getPosts, formatDate, postNumber } from './posts.js';
  import SectionHead from './SectionHead.svelte';

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

<section id="blog" class="relative pt-24 md:pt-32" bind:this={section}>
  <div class="relative max-w-7xl mx-auto px-6 flex flex-col gap-8 md:gap-12">
    <SectionHead num="03" label="Log" note="{posts.length} dispatches · one a month" />

    <div class="flex flex-col gap-4 md:gap-6">
      <h2 class="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.95]">
        Monthly <span class="text-accent">dispatches</span>
      </h2>
      <p class="text-textSecondary max-w-lg">
        What I've been working on, playing, watching and reading.
      </p>
    </div>

    <div class="flex flex-col border-b border-border">
      {#each posts as post, i (post.slug)}
        <a
          href={`#/blog/${post.slug}`}
          class="ledger reveal"
          style:transition-delay={`${i * 0.08}s`}
        >
          <span class="big" aria-hidden="true">{postNumber(post.slug)}</span>
          <span class="flex flex-col gap-2 md:gap-2.5">
            <span class="mono-tag">No. {postNumber(post.slug)} · {formatDate(post.date)}</span>
            <h3 class="font-display text-2xl md:text-4xl font-bold text-textPrimary leading-[1.1] transition-colors">
              {post.title}
            </h3>
            <span class="text-sm md:text-[15px] text-textSecondary leading-relaxed max-w-3xl">{post.excerpt}</span>
          </span>
          <span class="btn-secondary btn-sm read">Read <ArrowRight class="w-4 h-4" /></span>
        </a>
      {/each}
    </div>
  </div>
</section>
