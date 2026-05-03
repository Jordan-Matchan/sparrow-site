<script>
  import { X } from 'lucide-svelte';
  import logo from '../assets/logo.svg';

  let { open, onClose } = $props();

  const links = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];
</script>

<div
  class="mobile-menu"
  class:open
  role="dialog"
  aria-modal="true"
  aria-label="Site navigation"
  aria-hidden={!open}
  inert={!open}
>
  <div class="mobile-menu-header">
    <div class="flex items-center gap-2">
      <img src={logo} alt="" class="h-10 w-auto" />
      <span class="wordmark font-display text-2xl font-bold tracking-wider">Retro Insomnium</span>
    </div>
    <button class="hover:text-accent transition-colors" aria-label="Close menu" onclick={onClose}>
      <X class="w-6 h-6" />
    </button>
  </div>
  <nav class="mobile-menu-links" aria-label="Mobile primary">
    {#each links as link}
      <a href={link.href} class="mobile-link" onclick={onClose}>{link.label}</a>
    {/each}
  </nav>
</div>
