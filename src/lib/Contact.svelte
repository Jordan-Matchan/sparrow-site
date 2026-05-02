<script>
  import { onMount } from 'svelte';
  import { Mail, Instagram, Linkedin, Youtube } from 'lucide-svelte';

  let section;
  onMount(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (section) obs.observe(section);
    return () => obs.disconnect();
  });
</script>

<section id="contact" class="relative py-24 md:py-32" bind:this={section}>
  <div class="max-w-7xl mx-auto px-6">
    <div class="contact-card reveal">
      <div class="absolute inset-0 overflow-hidden rounded-2xl">
        <div class="absolute -top-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-warm/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative z-10 text-center">
        <span class="text-xs font-medium tracking-[0.3em] uppercase text-accent mb-4 block">Get in Touch</span>
        <h2 class="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Let's Create <span class="text-accent">Together</span>
        </h2>
        <p class="text-textSecondary max-w-md mx-auto mb-10">
          Have a project in mind? I'd love to hear about it. Let's bring your creative vision to life.
        </p>
        <a href="mailto:j.m.matchan@gmail.com" class="btn-primary inline-flex items-center gap-2 mb-10">
          <Mail class="w-4 h-4" />
          Contact Me
        </a>
        <div class="flex justify-center gap-4">
          <a
            href="https://www.instagram.com/retroinsomnium/"
            target="_blank"
            rel="noopener"
            class="social-icon"
            aria-label="Instagram"
          >
            <Instagram class="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/jordan-matchan-b270b2368/"
            target="_blank"
            rel="noopener"
            class="social-icon"
            aria-label="LinkedIn"
          >
            <Linkedin class="w-5 h-5" />
          </a>
          <a href="mailto:j.m.matchan@gmail.com" class="social-icon" aria-label="Email">
            <Mail class="w-5 h-5" />
          </a>
          <a
            href="https://retroinsomnium.tumblr.com/"
            target="_blank"
            rel="noopener"
            class="social-icon"
            aria-label="Tumblr"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-5 h-5"
            >
              <path d="M17 4v4h-2v4h2v5a3 3 0 0 0 3 3h2v-4h-2v-4h2V8h-2V4z" transform="translate(-3 0)" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@retroinsomnium"
            target="_blank"
            rel="noopener"
            class="social-icon"
            aria-label="YouTube"
          >
            <Youtube class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
