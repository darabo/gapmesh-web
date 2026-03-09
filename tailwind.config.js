/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F0EFF4', // Ghost
          dark: '#0A0A14', // Deep Void
        },
        primary: {
          light: '#0A0A14', // Deep Void text/elements in light mode
          dark: '#0A0A14', // Deep Void 
        },
        accent: {
          DEFAULT: '#39FF14', // Gap Mesh Neon Green
        },
        text: {
          light: '#18181B', // Graphite
          dark: '#F0EFF4', // Ghost (light text in dark mode)
        }
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      borderRadius: {
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4rem',
      },
      transitionTimingFunction: {
        'magnetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
