<script>
  import { onMount } from 'svelte';
  import { PenTool, Mountain, Box, Sparkles, ArrowRight } from 'lucide-svelte';
  import artfightIcon from '../assets/images/artfight-icon.webp';
  import SectionHead from './SectionHead.svelte';

  const caps = [
    { n: '01', icon: PenTool, tone: 'text-accent', title: 'Character design', desc: 'Original characters, sheets and concepts' },
    { n: '02', icon: Mountain, tone: 'text-warm', title: 'Environment art', desc: 'Worlds, rooms and atmospheres' },
    { n: '03', icon: Box, tone: 'text-accent', title: '3D modelling', desc: 'Stylised, game-ready assets' },
    { n: '04', icon: Sparkles, tone: 'text-warm', title: 'Texturing & VFX', desc: 'Surfaces, effects and post' },
  ];

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

<section id="about" class="relative pt-16 md:pt-28" bind:this={section}>
  <div class="max-w-7xl mx-auto px-6 flex flex-col gap-10 md:gap-14">
    <SectionHead num="01" label="About" note="Pre-production to post" />

    <div class="grid lg:grid-cols-[minmax(0,1fr)_480px] gap-10 lg:gap-24 items-start">
      <div class="reveal flex flex-col gap-6 md:gap-7">
        <h2 class="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.95]">
          The artist <span class="text-accent">behind</span><br class="hidden md:block" /> the work
        </h2>
        <p class="text-base md:text-lg text-textPrimary leading-relaxed max-w-2xl">
          Hi there! I'm a freelance artist that works in both 2D and 3D to create stylised art and models for games.
        </p>
        <p class="text-textSecondary leading-relaxed max-w-2xl">
          I specialise in pre-production and post-production processes, such as character design, concept design,
          environment design, 3D texturing and VFX. My passion lies in bringing vivid, stylised worlds to life through
          a combination of traditional and digital techniques.
        </p>
        <a href="#portfolio" class="btn-secondary btn-sm self-start">
          See my work
          <ArrowRight class="w-4 h-4" />
        </a>
      </div>

      <div class="reveal flex flex-col gap-6">
        <div class="flex gap-5 items-end">
          <div class="avatar-frame !w-[140px] !h-[140px] md:!w-[200px] md:!h-[200px] flex-shrink-0">
            <img src={artfightIcon} alt="Jordan (Sparrow) Matchan" />
          </div>
          <div class="flex flex-col gap-2 pb-2">
            <span class="mono-tag text-accent">&gt; artfight-icon.webp</span>
            <span class="mono-tag">Self portrait · 800 × 800</span>
          </div>
        </div>
        <div class="bg-surface border p-5 md:p-6" style="border-color: var(--border-mid); box-shadow: var(--shadow-pixel-dark);">
          <span class="mono-tag text-accent block mb-4">&gt; readout</span>
          <dl class="readout">
            <dt>Role</dt><dd>Freelance 2D &amp; 3D artist</dd>
            <dt>Pre-prod</dt><dd>Character · concept · environment design</dd>
            <dt>Post-prod</dt><dd>3D texturing · VFX</dd>
            <dt>Pronouns</dt><dd>She / They</dd>
            <dt>Status</dt><dd class="text-accent"><span class="dot"></span>Available for freelance</dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="caps reveal">
      {#each caps as cap}
        <div class="cap">
          <span class="n">{cap.n}</span>
          <cap.icon class="w-6 h-6 {cap.tone}" />
          <span class="font-bold tracking-wide text-sm md:text-base">{cap.title}</span>
          <span class="text-xs text-textSecondary leading-relaxed">{cap.desc}</span>
        </div>
      {/each}
    </div>
  </div>
</section>
