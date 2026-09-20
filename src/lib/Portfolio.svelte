<script>
  import { Expand, ArrowRight } from 'lucide-svelte';
  import { portfolioItems } from './portfolioData.js';
  import SectionHead from './SectionHead.svelte';

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

  const slotNum = String(portfolioItems.length + 1).padStart(2, '0');

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

<section id="portfolio" class="relative pt-24 md:pt-32" bind:this={section}>
  <div class="relative max-w-7xl mx-auto px-6 flex flex-col gap-8 md:gap-12">
    <SectionHead num="02" label="Work" note="{portfolioItems.length} pieces · illustration, concept, 3D" />

    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <h2 class="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.95]">
        Here's some<br class="hidden md:block" /> of <span class="text-accent">my work</span>
      </h2>
      <div class="flex gap-2 flex-wrap md:justify-end" role="group" aria-label="Portfolio filters">
        {#each filters as f}
          <button
            class="filter-btn"
            class:active={filter === f.id}
            aria-pressed={filter === f.id}
            onclick={() => (filter = f.id)}
          >
            {f.label}
          </button>
        {/each}
      </div>
    </div>

    <div class="portfolio-grid">
      {#each visibleItems as item, i (item.title)}
        <button
          type="button"
          class="portfolio-item reveal"
          class:portfolio-item-wide={item.wide}
          class:portfolio-item-feat={item.feat}
          onclick={() => handleClick(i)}
          style:transition-delay={`${Math.min(i, 6) * 0.06}s`}
          aria-label={`Open ${item.title}`}
        >
          <span class="tile-label"><b>{item.num}</b>{item.title} <span class="tl-cat"><b>//</b> {item.label}</span></span>
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
      <a href="#contact" class="commission reveal">
        <span class="mono-tag text-accent">&gt; slot {slotNum} open<span class="cursor blink inline-block align-middle ml-1" style="width: 0.5ch; height: 1em; background: var(--accent);" aria-hidden="true"></span></span>
        <div class="flex flex-col gap-3">
          <h3 class="font-display text-2xl md:text-4xl font-bold leading-none">Your project here</h3>
          <p class="text-xs md:text-sm text-textSecondary leading-relaxed">
            Taking commissions for characters, concepts, environments and game-ready 3D.
          </p>
          <span class="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-[0.1em] uppercase">
            Get in touch <ArrowRight class="w-4 h-4" />
          </span>
        </div>
      </a>
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
