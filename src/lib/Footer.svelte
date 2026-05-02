<script>
  import logo from '../assets/logo.svg';
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
          <span class="wordmark font-display text-2xl font-bold tracking-wider">Retro Insomnium</span>
        </a>
        <p class="text-xs text-textSecondary">© Sparrow Matchan 2025. All rights reserved.</p>
      </div>
      <div class="flex items-center gap-6 text-sm">
        <a href="#about" class="text-textSecondary hover:text-textPrimary transition-colors">About</a>
        <a href="#portfolio" class="text-textSecondary hover:text-textPrimary transition-colors">Portfolio</a>
        <a href="#contact" class="text-textSecondary hover:text-textPrimary transition-colors">Contact</a>
      </div>
    </div>
  </div>
</footer>
