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
        teal: {
          50:  '#f0faf8',
          100: '#d0f0e8',
          200: '#a0dfd0',
          300: '#6fcab8',
          400: '#3fae9e',
          500: '#1d9282',
          600: '#1d7063',
          700: '#1d5048',
          800: '#1d3d39',
          900: '#122824',
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
        // Keep navy as alias for backward-compat during transition
        navy: {
          50:  '#f0faf8',
          100: '#d0f0e8',
          200: '#a0dfd0',
          300: '#6fcab8',
          400: '#3fae9e',
          500: '#1d9282',
          600: '#1d7063',
          700: '#1d5048',
          800: '#1d3d39',
          900: '#122824',
        },
      },
      fontFamily: {
        sans:    ['Cairo', 'system-ui', 'sans-serif'],
        serif:   ['Cairo', 'Georgia', 'serif'],
        arabic:  ['Cairo', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.14)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
