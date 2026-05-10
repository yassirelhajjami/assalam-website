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
        navy: {
          50:  '#EEF2F8',
          100: '#D1DCF0',
          200: '#A3B8E1',
          300: '#7594D2',
          400: '#4770C3',
          500: '#2A4A6B',
          600: '#1B3252',
          700: '#132540',
          800: '#0B172E',
          900: '#050A1C',
        },
        gold: {
          50:  '#FDF8ED',
          100: '#FAF0D0',
          200: '#F5E2A1',
          300: '#EFD372',
          400: '#E5C243',
          500: '#C8A84B',
          600: '#A07830',
          700: '#785820',
          800: '#503810',
          900: '#281800',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        serif:   ['Playfair Display', 'Georgia', 'serif'],
        arabic:  ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
