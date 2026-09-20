<script>
  let { num, label, note = '' } = $props();
</script>

<div class="section-head">
  <span class="numtag">{num}</span>
  <span class="mono-tag text-accent">// {label}</span>
  <span class="dash"></span>
  {#if note}
    <span class="mono-tag hidden sm:inline">{note}</span>
  {/if}
</div>
