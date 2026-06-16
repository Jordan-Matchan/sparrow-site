<script>
  import logo from '../assets/logo.svg';

  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const yearRange = currentYear > startYear ? `${startYear}–${currentYear}` : `${startYear}`;
</script>

<footer class="border-t border-border py-12">
  <div class="max-w-7xl mx-auto px-6">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex flex-col items-center md:items-start">
        <a
          href="#hero"
          class="flex items-center gap-2 transition-opacity hover:opacity-80 mb-2"
          aria-label="Retro Insomnium — Home"
        >
          <img src={logo} alt="" class="h-12 w-auto" />
          <span class="wordmark font-display text-2xl font-bold tracking-wider">RETRO<span class="wm-suffix">&nbsp;INSOMNIUM</span></span>
        </a>
        <p class="text-xs text-textSecondary">© Sparrow Matchan {yearRange}. All rights reserved.</p>
      </div>
      <div class="flex flex-col items-center md:items-end gap-3">
        <nav class="flex items-center gap-6 text-sm" aria-label="Footer">
          <a href="#about" class="text-textSecondary hover:text-textPrimary transition-colors">About</a>
          <a href="#portfolio" class="text-textSecondary hover:text-textPrimary transition-colors">Portfolio</a>
          <a href="#contact" class="text-textSecondary hover:text-textPrimary transition-colors">Contact</a>
        </nav>
        <p class="text-xs text-textSecondary">
          Site designed by
          <a
            href="https://mooshieblob.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-accent hover:underline underline-offset-2 transition-colors"
          >mooshieblob</a>
        </p>
      </div>
    </div>
  </div>
</footer>
