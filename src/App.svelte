<script>
  import { onMount } from 'svelte';
  import CursorGlow from './lib/CursorGlow.svelte';
  import Navbar from './lib/Navbar.svelte';
  import MobileMenu from './lib/MobileMenu.svelte';
  import Hero from './lib/Hero.svelte';
  import About from './lib/About.svelte';
  import Portfolio from './lib/Portfolio.svelte';
  import Blog from './lib/Blog.svelte';
  import BlogPost from './lib/BlogPost.svelte';
  import Admin from './lib/Admin.svelte';
  import Contact from './lib/Contact.svelte';
  import Footer from './lib/Footer.svelte';
  import Lightbox from './lib/Lightbox.svelte';

  let mobileMenuOpen = $state(false);
  let lightboxState = $state({ open: false, items: [], index: 0 });

  // Hash-based routing. `#/blog/<slug>` shows a single post; everything
  // else (including bare `#section` anchors) shows the home page.
  let route = $state(parseRoute());

  function parseRoute() {
    const hash = typeof window === 'undefined' ? '' : window.location.hash;
    const post = hash.match(/^#\/blog\/([^/?#]+)/);
    if (post) return { name: 'post', slug: decodeURIComponent(post[1]) };
    if (/^#\/admin\/?$/.test(hash)) return { name: 'admin' };
    return { name: 'home' };
  }

  function openLightbox(items, index) {
    lightboxState = { open: true, items, index };
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxState = { ...lightboxState, open: false };
    document.body.style.overflow = '';
  }

  function openMobileMenu() {
    mobileMenuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  onMount(() => {
    const onHashChange = () => {
      const next = parseRoute();
      route = next;
      // When entering a post / admin page, jump to top so the header is visible.
      if (next.name === 'post' || next.name === 'admin') {
        window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  });
</script>

<CursorGlow />

<div class="noise-overlay"></div>

<Navbar onOpenMobileMenu={openMobileMenu} />

<MobileMenu open={mobileMenuOpen} onClose={closeMobileMenu} />

{#if route.name === 'post'}
  <BlogPost slug={route.slug} />
{:else if route.name === 'admin'}
  <Admin />
{:else}
  <Hero />
  <About />
  <Portfolio onOpenLightbox={openLightbox} />
  <Blog />
  <Contact />
{/if}
<Footer />

<Lightbox
  open={lightboxState.open}
  items={lightboxState.items}
  index={lightboxState.index}
  onClose={closeLightbox}
  onIndexChange={(i) => (lightboxState = { ...lightboxState, index: i })}
/>
