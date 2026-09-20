<script>
  import { onMount } from 'svelte';
  import { Mail, Instagram, Linkedin, Youtube } from 'lucide-svelte';
  import SectionHead from './SectionHead.svelte';

  let section;
  const _e = ['j.m.matchan', '@', 'gmail', '.', 'com'].join('');
  const mailtoHref = `mailto:${_e}`;

  const channels = [
    { name: 'Instagram', handle: '@retroinsomnium', href: 'https://www.instagram.com/retroinsomnium/', icon: Instagram },
    { name: 'Tumblr', handle: 'retroinsomnium.tumblr.com', href: 'https://retroinsomnium.tumblr.com/', icon: null },
    { name: 'YouTube', handle: '@retroinsomnium', href: 'https://www.youtube.com/@retroinsomnium', icon: Youtube },
    { name: 'LinkedIn', handle: 'Jordan Matchan', href: 'https://www.linkedin.com/in/jordan-matchan-b270b2368/', icon: Linkedin },
  ];

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
  <div class="max-w-7xl mx-auto px-6 flex flex-col gap-8 md:gap-12">
    <SectionHead num="04" label="Contact" note="Replies within a few days" />

    <div class="reveal flex flex-col gap-6 md:gap-10">
      <h2 class="contact-title font-bold">
        <span>Let's create</span>
        <span class="hi-block">together</span>
      </h2>
      <p class="text-textSecondary text-base md:text-lg leading-relaxed max-w-xl">
        Have a project in mind? I'd love to hear about it. Let's bring your creative vision to life.
      </p>
      <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <a href={mailtoHref} class="btn-primary justify-center md:px-7 md:py-4 md:text-[15px]">
          <Mail class="w-4 h-4" />
          Contact me
        </a>
        <span class="mono-tag hidden sm:inline">{_e}</span>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        {#each channels as ch}
          <a href={ch.href} target="_blank" rel="noopener noreferrer" class="chan">
            {#if ch.icon}
              <ch.icon class="w-5 h-5" />
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M17 4v4h-2v4h2v5a3 3 0 0 0 3 3h2v-4h-2v-4h2V8h-2V4z" transform="translate(-3 0)" />
              </svg>
            {/if}
            <span class="mono-tag text-textPrimary">{ch.name}</span>
            <span class="text-xs text-textSecondary break-all">{ch.handle}</span>
          </a>
        {/each}
        <a href={mailtoHref} class="chan">
          <Mail class="w-5 h-5" />
          <span class="mono-tag text-textPrimary">Email</span>
          <span class="text-xs text-textSecondary break-all">{_e}</span>
        </a>
      </div>
    </div>
  </div>
</section>
