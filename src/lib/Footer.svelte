<script>
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const yearRange = currentYear > startYear ? `${startYear}–${currentYear}` : `${startYear}`;
</script>

<footer class="relative overflow-hidden border-t border-border pt-8">
  <div class="max-w-7xl mx-auto px-6 flex flex-col gap-5">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <nav class="flex items-center gap-5 md:gap-6 text-sm" aria-label="Footer">
        <a href="#about" class="text-textSecondary hover:text-textPrimary transition-colors">About</a>
        <a href="#portfolio" class="text-textSecondary hover:text-textPrimary transition-colors">Work</a>
        <a href="#blog" class="text-textSecondary hover:text-textPrimary transition-colors">Log</a>
        <a href="#contact" class="text-textSecondary hover:text-textPrimary transition-colors">Contact</a>
      </nav>
      <span class="mono-tag">End of transmission</span>
    </div>
    <div class="flex flex-wrap justify-between gap-2 text-xs text-textSecondary">
      <p>© Sparrow Matchan {yearRange}. All rights reserved.</p>
      <p>
        Site designed by
        <a
          href="https://mooshieblob.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-accent hover:underline underline-offset-2 transition-colors"
        >mooshieblob</a>
      </p>
    </div>
    <div class="footer-mark mt-2" aria-hidden="true">RETRO INSOMNIUM</div>
  </div>
</footer>
