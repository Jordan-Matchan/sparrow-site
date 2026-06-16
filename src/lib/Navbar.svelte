<script>
  import { onMount } from 'svelte';
  import { Menu } from 'lucide-svelte';
  import logo from '../assets/logo.svg';

  let { onOpenMobileMenu } = $props();

  let scrolled = $state(false);
  let activeSection = $state('hero');
  let suffix = $state('');
  let caretBlinking = $state(true);

  const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

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
    const word = ' INSOMNIUM'; // leading nbsp = space after "RETRO"
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer;
    if (reduce) {
      suffix = word;
      caretBlinking = true;
    } else {
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
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
      clearTimeout(timer);
    };
  });
</script>

<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500" class:scrolled aria-label="Primary">
  <div class="nav-inner max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <a
      href="#hero"
      class="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
      aria-label="Retro Insomnium — Home"
    >
      <img src={logo} alt="" class="h-12 md:h-14 w-auto" />
      <span class="wordmark font-display text-3xl md:text-4xl font-bold tracking-wider">RETRO<span class="wm-suffix">{suffix}</span><span class="cursor" class:blink={caretBlinking}></span></span>
    </a>
    <div class="hidden md:flex items-center gap-1">
      {#each links as link}
        <a
          href={`#${link.id}`}
          class="nav-link"
          class:active={activeSection === link.id}
          aria-current={activeSection === link.id ? 'location' : undefined}
        >
          {link.label}
        </a>
      {/each}
    </div>
    <button
      class="md:hidden text-textPrimary hover:text-accent transition-colors"
      aria-label="Toggle menu"
      onclick={onOpenMobileMenu}
    >
      <Menu class="w-6 h-6" />
    </button>
  </div>
</nav>
