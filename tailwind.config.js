/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elden: {
          950: '#07090c',
          900: '#0d1117',
          850: '#131821',
          800: '#1a222d',
          700: '#273344',
          600: '#3e4f66',
          border: '#2a3547',
          gold: {
            DEFAULT: '#c5a059',
            light: '#e8cb8d',
            dark: '#8e7136',
            glow: '#ffd700',
          },
          rune: '#d4af37',
          crimson: '#a32828',
          cerulean: '#2962ff',
          rot: '#bd4b32',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(197, 160, 89, 0.25)',
        'gold-glow-lg': '0 0 25px rgba(197, 160, 89, 0.45)',
      },
    },
  },
  plugins: [],
}
