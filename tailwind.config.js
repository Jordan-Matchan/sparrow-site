/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {
      colors: {
        bg: '#0c0613',
        surface: '#160a20',
        surfaceLight: '#22102e',
        accent: '#E781FF',
        accentDim: '#922AB1',
        warm: '#C9F6FF',
        textPrimary: '#E8F0F5',
        textSecondary: '#A98DC0',
        border: '#3a1d4d',
      },
      fontFamily: {
        display: ['"Grape Soda"', 'sans-serif'],
        body: ['"VCR OSD Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
