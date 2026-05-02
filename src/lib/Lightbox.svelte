<script>
  import { onMount } from 'svelte';
  import { X, ChevronLeft, ChevronRight } from 'lucide-svelte';

  let { open, items, index, onClose, onIndexChange } = $props();

  let current = $derived(items?.[index]);

  function prev() {
    if (!items.length) return;
    onIndexChange((index - 1 + items.length) % items.length);
  }
  function next() {
    if (!items.length) return;
    onIndexChange((index + 1) % items.length);
  }

  function onKey(e) {
    if (!open) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  onMount(() => {
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });
</script>

<div class="lightbox" class:open aria-hidden={!open}>
  <button class="lightbox-close" aria-label="Close lightbox" onclick={onClose}>
    <X class="w-6 h-6" />
  </button>
  <button class="lightbox-nav lightbox-prev" aria-label="Previous image" onclick={prev}>
    <ChevronLeft class="w-6 h-6" />
  </button>
  <button class="lightbox-nav lightbox-next" aria-label="Next image" onclick={next}>
    <ChevronRight class="w-6 h-6" />
  </button>
  <div class="lightbox-content">
    {#if current}
      <img src={current.src} alt={current.title} class="lightbox-image" />
      <div class="lightbox-info">
        <h3 class="font-display font-semibold text-lg">{current.title}</h3>
      </div>
    {/if}
  </div>
  <button
    type="button"
    class="lightbox-backdrop"
    aria-label="Close lightbox"
    onclick={onClose}
  ></button>
</div>

<style>
  .lightbox-backdrop {
    border: 0;
    padding: 0;
    cursor: pointer;
  }
</style>
