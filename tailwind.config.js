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
          950: '#050507',
          900: '#0a0b0f',
          850: '#11131a',
          800: '#171a24',
          700: '#222635',
          600: '#353c50',
          border: '#2e271c',
          'border-gold': 'rgba(201, 160, 80, 0.35)',
          gold: {
            DEFAULT: '#c9a050',
            light: '#f3db98',
            dark: '#8c6b2d',
            glow: '#ffd255',
          },
          rune: '#d4af37',
          crimson: '#9e2a2b',
          cerulean: '#2962ff',
          rot: '#bd4b32',
        },
      },
      fontFamily: {
        decorative: ['"Cinzel Decorative"', 'Cinzel', 'Georgia', 'serif'],
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 16px rgba(201, 160, 80, 0.25)',
        'gold-glow-lg': '0 0 30px rgba(201, 160, 80, 0.45)',
        'crimson-glow': '0 0 16px rgba(158, 42, 43, 0.45)',
        'runic': '0 4px 20px -2px rgba(0, 0, 0, 0.8), 0 0 12px rgba(201, 160, 80, 0.15)',
      },
    },
  },
  plugins: [],
}
