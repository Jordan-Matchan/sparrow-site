<script>
  import { onMount } from 'svelte';

  let el;
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;
  let raf;

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function animate() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if (el) {
      el.style.left = glowX + 'px';
      el.style.top = glowY + 'px';
    }
    raf = requestAnimationFrame(animate);
  }

  onMount(() => {
    if ('ontouchstart' in window) {
      if (el) el.style.display = 'none';
      return;
    }
    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  });
</script>

<div bind:this={el} class="cursor-glow"></div>
