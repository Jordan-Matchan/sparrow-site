<script>
  import { ArrowDownRight, ArrowRight, ChevronDown } from 'lucide-svelte';
  import artfightIcon from '../assets/images/artfight-icon.webp';
</script>

<section id="hero" class="relative min-h-screen flex items-center overflow-hidden">
  <div class="absolute inset-0 hero-bg"></div>
  <div class="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent"></div>
  <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
    <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      <div class="flex-shrink-0 order-2 lg:order-1">
        <div class="avatar-container">
          <img
            src={artfightIcon}
            alt="Jordan (Sparrow) Matchan"
            class="avatar-img"
          />
        </div>
      </div>
      <div class="order-1 lg:order-2 text-center lg:text-left">
        <div class="inline-block mb-4 px-4 py-1.5 rounded-full border border-border bg-surface/50 backdrop-blur-sm">
          <span class="text-xs font-medium tracking-widest text-accent uppercase">Available for Freelance</span>
        </div>
        <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 hero-title">
          Jordan (Sparrow) <span class="text-accent">Matchan</span>
        </h1>
        <p class="font-display text-xl md:text-2xl text-textSecondary font-light mb-1 tracking-wide">
          3D & 2D Artist
        </p>
        <p class="text-sm text-textSecondary/60 font-light mb-8 tracking-widest uppercase">
          She / They
        </p>
        <p class="text-base md:text-lg text-textSecondary leading-relaxed max-w-xl mb-10">
          Freelance artist working in both 2D and 3D to create stylised art and models for games. Specialising in
          pre-production and post-production processes — character design, concept design, environment design, 3D
          texturing & VFX.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <a href="#portfolio" class="btn-primary">
            View Portfolio
            <ArrowDownRight class="w-4 h-4" />
          </a>
          <a href="#about" class="btn-secondary">
            Learn More
            <ArrowRight class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </div>

  <a
    href="#about"
    aria-label="Scroll to next section"
    class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce hover:text-accent transition-colors"
  >
    <span class="text-[10px] tracking-[0.3em] uppercase text-textSecondary font-medium">Scroll</span>
    <ChevronDown class="w-4 h-4 text-accent" />
  </a>
</section>
