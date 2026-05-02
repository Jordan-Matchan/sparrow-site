import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Project page deploy: served from /sparrow-site/ on github.io.
// Override with VITE_BASE for custom domain or local preview.
const base = process.env.VITE_BASE ?? '/sparrow-site/';

export default defineConfig({
  base,
  plugins: [svelte()],
});
