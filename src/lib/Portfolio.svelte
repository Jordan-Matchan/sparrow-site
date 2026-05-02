<script>
  import { Expand } from 'lucide-svelte';
  import { portfolioItems } from './portfolioData.js';

  let { onOpenLightbox } = $props();

  let filter = $state('all');
  const filters = [
    { id: 'all', label: 'All' },
    { id: '2d', label: 'Illustrations & Concept Art' },
    { id: '3d', label: '3D & VFX' },
  ];

  let visibleItems = $derived(
    filter === 'all' ? portfolioItems : portfolioItems.filter((i) => i.category === filter)
  );

  function handleClick(idx) {
    const items = visibleItems.map((i) => ({ src: i.src, title: i.title }));
    onOpenLightbox(items, idx);
  }

  let section;
  // Re-observe `.reveal` elements whenever the filtered list changes so that
  // newly-mounted cards get the reveal class applied. Reading visibleItems
  // inside the effect makes Svelte 5 track it as a dependency.
  $effect(() => {
    visibleItems;
    if (!section) return;
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
    const els = section.querySelectorAll('.reveal:not(.revealed)');
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
</script>

<section id="portfolio" class="relative py-24 md:py-32" bind:this={section}>
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none"></div>
  <div class="relative max-w-7xl mx-auto px-6">
    <div class="text-center mb-16">
      <span class="text-xs font-medium tracking-[0.3em] uppercase text-accent mb-4 block">Portfolio</span>
      <h2 class="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        Here's Some of <span class="text-accent">My Work</span>
      </h2>
      <p class="text-textSecondary max-w-lg mx-auto">A collection of illustrations, concept art, and 3D projects.</p>
    </div>

    <div class="flex justify-center gap-2 mb-12 flex-wrap">
      {#each filters as f}
        <button class="filter-btn" class:active={filter === f.id} onclick={() => (filter = f.id)}>
          {f.label}
        </button>
      {/each}
    </div>

    <div class="portfolio-grid">
      {#each visibleItems as item, i (item.title)}
        <button
          type="button"
          class="portfolio-item reveal"
          class:portfolio-item-wide={item.wide}
          onclick={() => handleClick(i)}
          style:transition-delay={`${Math.min(i, 6) * 0.06}s`}
          aria-label={`Open ${item.title}`}
        >
          <img src={item.src} alt={item.title} class="portfolio-img" />
          <div class="portfolio-overlay">
            <span class="portfolio-category">{item.label}</span>
            <h3 class="portfolio-title">{item.title}</h3>
            <div class="portfolio-expand">
              <Expand class="w-5 h-5" />
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>

<style>
  .portfolio-item {
    background: transparent;
    padding: 0;
    text-align: left;
    font: inherit;
  }
</style>
