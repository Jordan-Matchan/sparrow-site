<script>
  // Decorative pixel cluster, drawn from the design system's cover pattern.
  let { cols = 6, rows = 4, pitch = 14, size = 4, class: className = '', style = '' } = $props();

  let cells = $derived.by(() => {
    const out = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if ((c + r) % 3 !== 1) out.push({ x: c * pitch, y: r * pitch });
      }
    }
    return out;
  });
  let w = $derived(cols * pitch);
  let h = $derived(rows * pitch);
</script>

<svg class="pix {className}" {style} width={w} height={h} viewBox="0 0 {w} {h}" aria-hidden="true">
  {#each cells as cell}
    <rect x={cell.x} y={cell.y} width={size} height={size} fill="#922ab1" />
  {/each}
</svg>
