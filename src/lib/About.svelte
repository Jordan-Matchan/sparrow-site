<script>
  import { onMount } from 'svelte';
  import { PenTool, Mountain, Box, Sparkles, ArrowRight } from 'lucide-svelte';
  import imgLaurence from '../assets/images/laurence.webp';
  import imgOctavia from '../assets/images/octavia.webp';
  import imgReedsRoom from '../assets/images/reeds-room-concept.webp';

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

<section id="about" class="relative py-24 md:py-32" bind:this={section}>
  <div class="max-w-7xl mx-auto px-6">
    <div class="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
      <div class="lg:w-2/5 reveal">
        <span class="text-xs font-medium tracking-[0.3em] uppercase text-accent mb-4 block">About</span>
        <h2 class="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
          The Artist <span class="text-accent">Behind</span> the Work
        </h2>
        <div class="w-16 h-px bg-accent/40 mb-8"></div>
        <p class="text-textSecondary leading-relaxed mb-6">
          Hi there! I'm a freelance artist that works in both 2D and 3D to create stylised art and models for games.
        </p>
        <p class="text-textSecondary leading-relaxed mb-8">
          I specialise in pre-production and post-production processes, such as character design, concept design,
          environment design, 3D texturing and VFX. My passion lies in bringing vivid, stylised worlds to life through
          a combination of traditional and digital techniques.
        </p>
        <div class="grid grid-cols-2 gap-6 mb-8">
          <div class="p-4 rounded-xl bg-surface border border-border">
            <PenTool class="w-5 h-5 text-accent mb-2" />
            <h4 class="font-body font-bold text-base mb-1 tracking-wide">Character Design</h4>
            <p class="text-xs text-textSecondary">Original characters & concepts</p>
          </div>
          <div class="p-4 rounded-xl bg-surface border border-border">
            <Mountain class="w-5 h-5 text-warm mb-2" />
            <h4 class="font-body font-bold text-base mb-1 tracking-wide">Environment Art</h4>
            <p class="text-xs text-textSecondary">Worlds & atmospheres</p>
          </div>
          <div class="p-4 rounded-xl bg-surface border border-border">
            <Box class="w-5 h-5 text-accent mb-2" />
            <h4 class="font-body font-bold text-base mb-1 tracking-wide">3D Modeling</h4>
            <p class="text-xs text-textSecondary">Stylised game assets</p>
          </div>
          <div class="p-4 rounded-xl bg-surface border border-border">
            <Sparkles class="w-5 h-5 text-warm mb-2" />
            <h4 class="font-body font-bold text-base mb-1 tracking-wide">VFX</h4>
            <p class="text-xs text-textSecondary">Visual effects & post</p>
          </div>
        </div>
        <a href="#portfolio" class="inline-flex items-center gap-2 text-accent hover:text-white transition-colors font-medium text-sm group">
          See my work
          <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
      <div class="lg:w-3/5 reveal">
        <div class="about-image-grid">
          <div class="about-img-wrapper about-img-large">
            <img
              src={imgLaurence}
              alt="Laurence - Character Art"
              class="about-img"
            />
            <div class="img-overlay">
              <span class="text-xs tracking-widest uppercase font-medium">Character Art</span>
            </div>
          </div>
          <div class="about-img-wrapper about-img-small top-img">
            <img
              src={imgOctavia}
              alt="Octavia - Character Art"
              class="about-img"
            />
            <div class="img-overlay">
              <span class="text-xs tracking-widest uppercase font-medium">Illustration</span>
            </div>
          </div>
          <div class="about-img-wrapper about-img-small bottom-img">
            <img
              src={imgReedsRoom}
              alt="Room Concept - Environment Design"
              class="about-img"
            />
            <div class="img-overlay">
              <span class="text-xs tracking-widest uppercase font-medium">Environment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
