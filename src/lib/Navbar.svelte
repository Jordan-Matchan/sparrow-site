<script>
  import { onMount } from 'svelte';
  import { Menu, ArrowDownRight } from 'lucide-svelte';
  import logo from '../assets/logo.svg';

  let { onOpenMobileMenu } = $props();

  let scrolled = $state(false);
  let activeSection = $state('hero');
  let suffix = $state('');
  let caretBlinking = $state(true);

  const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', num: '01', label: 'About' },
    { id: 'portfolio', num: '02', label: 'Work' },
    { id: 'blog', num: '03', label: 'Log' },
    { id: 'contact', num: '04', label: 'Contact' },
  ];

  const year = new Date().getFullYear();

  onMount(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', onScroll);

    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeSection = entry.target.id;
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => obs.observe(s));

    // Typing wordmark: "RETRO" -> types " INSOMNIUM" -> holds -> erases -> loops.
    // U+00A0 (non-breaking space) keeps the gap after "RETRO" robust without
    // relying on `white-space: pre` — mirrors the static Footer wordmark.
    const word = ' INSOMNIUM';
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;

    const startTyping = () => {
      const TYPE = 115, ERASE = 70, HOLD_FULL = 2400, HOLD_EMPTY = 1800;
      let i = 0;
      const type = () => {
        caretBlinking = false;
        i++;
        suffix = word.slice(0, i);
        if (i < word.length) timer = setTimeout(type, TYPE);
        else { caretBlinking = true; timer = setTimeout(erase, HOLD_FULL); }
      };
      const erase = () => {
        caretBlinking = false;
        i--;
        suffix = word.slice(0, i);
        if (i > 0) timer = setTimeout(erase, ERASE);
        else { caretBlinking = true; timer = setTimeout(type, HOLD_EMPTY); }
      };
      timer = setTimeout(type, HOLD_EMPTY);
    };

    // Apply the current motion preference; re-applied live if the user toggles
    // Reduce Motion mid-session so the JS loop stays in sync with the CSS.
    const applyMotionPref = () => {
      clearTimeout(timer);
      caretBlinking = true;
      if (mql.matches) {
        suffix = word;
      } else {
        suffix = '';
        startTyping();
      }
    };
    applyMotionPref();
    mql.addEventListener('change', applyMotionPref);

    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
      clearTimeout(timer);
      mql.removeEventListener('change', applyMotionPref);
    };
  });
</script>

<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500" class:scrolled aria-label="Primary">
  <div class="status-bar" aria-label="Status">
    <span>CH 01</span>
    <span class="hide-sm">Retro Insomnium</span>
    <span>Signal OK</span>
    <span class="text-accent">Available for freelance</span>
    <span class="hide-sm">{year}</span>
  </div>
  <div class="nav-inner max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
    <a
      href="#hero"
      class="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
      aria-label="Retro Insomnium — Home"
    >
      <img src={logo} alt="" class="h-10 md:h-12 lg:h-14 w-auto" />
      <span class="wordmark font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider">RETRO<span class="wm-suffix">{suffix}</span><span class="cursor" class:blink={caretBlinking} aria-hidden="true"></span></span>
    </a>
    <div class="hidden md:flex items-center gap-1">
      {#each links as link}
        <a
          href={`#${link.id}`}
          class="nav-link whitespace-nowrap"
          class:active={activeSection === link.id}
          aria-current={activeSection === link.id ? 'location' : undefined}
        >
          {#if link.num}<span class="hidden lg:inline">{link.num}&nbsp;</span>{/if}{link.label}
        </a>
      {/each}
    </div>
    <div class="hidden lg:block">
      <a href="#contact" class="btn-primary btn-sm">Hire me <ArrowDownRight class="w-4 h-4" /></a>
    </div>
    <button
      class="md:hidden w-11 h-11 flex items-center justify-center border border-border-mid text-textPrimary hover:text-accent hover:border-accent transition-colors"
      style="border-color: var(--border-mid);"
      aria-label="Toggle menu"
      onclick={onOpenMobileMenu}
    >
      <Menu class="w-6 h-6" />
    </button>
  </div>
</nav>
