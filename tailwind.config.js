/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdf4f7',
          100: '#fce8f0',
          200: '#fad1e2',
          300: '#f5a9c8',
          400: '#ee7aa5',
          500: '#e34d82',
          600: '#d12d63',
          700: '#b31e4c',
          800: '#951b40',
          900: '#7d1b39',
        },
        warm: {
          50: '#fefcf4',
          100: '#fdf8e3',
          200: '#faefc2',
          300: '#f6e197',
          400: '#f0cd60',
          500: '#e8b83a',
          600: '#d49a28',
          700: '#b17723',
          800: '#905f24',
          900: '#764e21',
        },
        sage: {
          50: '#f4f9f4',
          100: '#e5f2e6',
          200: '#cce5cf',
          300: '#a4d0a8',
          400: '#74b37a',
          500: '#519758',
          600: '#3f7b45',
          700: '#346239',
          800: '#2d4f31',
          900: '#26412a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
