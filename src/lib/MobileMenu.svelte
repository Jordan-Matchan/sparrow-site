<script>
  import { onMount } from 'svelte';
  import { X } from 'lucide-svelte';
  import logo from '../assets/logo.svg';

  let { open, onClose } = $props();
  let dialog;
  let closeButton;
  let lastOpen = false;
  let previousFocus;

  const focusableSelector = [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  const links = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  function focusableElements() {
    if (!dialog) return [];
    return [...dialog.querySelectorAll(focusableSelector)].filter((el) => el.getClientRects().length);
  }

  function handleKeydown(e) {
    if (!open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;

    const focusable = focusableElements();
    if (!focusable.length) {
      e.preventDefault();
      dialog?.focus({ preventScroll: true });
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!dialog.contains(document.activeElement)) {
      e.preventDefault();
      first.focus({ preventScroll: true });
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus({ preventScroll: true });
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus({ preventScroll: true });
    }
  }

  $effect(() => {
    if (open && !lastOpen) {
      previousFocus = document.activeElement;
      queueMicrotask(() => closeButton?.focus({ preventScroll: true }));
    } else if (!open && lastOpen) {
      queueMicrotask(() => previousFocus?.focus?.({ preventScroll: true }));
    }
    lastOpen = open;
  });

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });
</script>

<div
  bind:this={dialog}
  class="mobile-menu"
  class:open
  role="dialog"
  aria-modal="true"
  aria-label="Site navigation"
  aria-hidden={!open}
  inert={!open}
  tabindex="-1"
>
  <div class="mobile-menu-header">
    <div class="flex items-center gap-2">
      <img src={logo} alt="" class="h-10 w-auto" />
      <span class="wordmark font-display text-2xl font-bold tracking-wider">Retro Insomnium</span>
    </div>
    <button bind:this={closeButton} class="hover:text-accent transition-colors" aria-label="Close menu" onclick={onClose}>
      <X class="w-6 h-6" />
    </button>
  </div>
  <nav class="mobile-menu-links" aria-label="Mobile primary">
    {#each links as link}
      <a href={link.href} class="mobile-link" onclick={onClose}>{link.label}</a>
    {/each}
  </nav>
</div>
