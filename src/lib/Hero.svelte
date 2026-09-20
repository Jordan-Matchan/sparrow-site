<script>
  import { ArrowDownRight, ArrowRight } from 'lucide-svelte';
  import imgReedsRoom from '../assets/images/reeds-room-concept.webp';
  import Pixels from './Pixels.svelte';
</script>

<section id="hero" class="relative min-h-screen flex items-center overflow-hidden">
  <div class="watermark" aria-hidden="true">Retro Insomnium</div>
  <Pixels cols={10} rows={3} class="hidden md:block" style="left: 1.5rem; top: 7.5rem;" />
  <Pixels cols={8} rows={5} class="hidden lg:block" style="right: 6rem; bottom: 9rem;" />

  <div class="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-32 md:pt-48 md:pb-40 w-full">
    <div class="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_560px] gap-10 lg:gap-16 items-center">
      <div class="flex flex-col gap-6 md:gap-7 min-w-0">
        <span class="mono-tag text-accent tracking-[0.3em]">// Jordan (Sparrow) Matchan · 3D &amp; 2D artist · She / They</span>
        <h1 class="hero-name">
          <span class="text-accent">Sparrow</span>
          <span class="hollow">Matchan</span>
        </h1>
        <p class="text-base md:text-lg text-textSecondary leading-relaxed max-w-lg mt-2">
          Freelance artist making stylised art and models for games — character, concept and environment
          design up front, 3D texturing &amp; VFX at the end.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="#portfolio" class="btn-primary justify-center md:px-6 md:py-4 md:text-sm">
            View work
            <ArrowDownRight class="w-4 h-4" />
          </a>
          <a href="#blog" class="btn-secondary justify-center md:px-6 md:py-4 md:text-sm">
            Read the log
            <ArrowRight class="w-4 h-4" />
          </a>
        </div>
      </div>

      <div class="bezel min-w-0">
        <span class="screw" style="left: 5px; top: 5px;"></span>
        <span class="screw" style="right: 5px; top: 5px;"></span>
        <span class="screw" style="left: 5px; bottom: 5px;"></span>
        <span class="screw" style="right: 5px; bottom: 5px;"></span>
        <div class="flex items-center justify-between gap-3 mb-2.5">
          <span class="mono-tag truncate">CH 01 · reeds-room-concept.webp</span>
          <span class="mono-tag text-accent whitespace-nowrap"><span class="dot"></span>Rec 00:00:14</span>
        </div>
        <a href="#portfolio" class="screen" aria-label="Reed's Room, an environment concept — open the portfolio">
          <img src={imgReedsRoom} alt="" />
        </a>
        <div class="flex items-center justify-between gap-3 mt-2.5">
          <span class="mono-tag truncate">Reed's Room · environment concept · 2025</span>
          <span class="flex gap-1.5" aria-hidden="true">
            <span class="led on"></span><span class="led on"></span><span class="led"></span><span class="led"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
