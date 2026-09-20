<script>
  const items = [
    'Character design',
    'Concept art',
    'Environment design',
    '3D texturing',
    'VFX',
    'Stylised game art',
  ];
  // The track is doubled so the loop is seamless; the copy is aria-hidden.
  const track = [...items, ...items];
</script>

<div class="tape" aria-label="Disciplines: {items.join(', ')}">
  <div class="tape-track" aria-hidden="true">
    {#each track as item}
      <span>{item}</span><b>//</b>
    {/each}
  </div>
</div>
