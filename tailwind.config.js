/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: '#B09280',
        yellow: '#EAE62F',
        blue: '#698AC5',
        black: '#262626',
        white: '#FBFAFA',
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      scale: {
        102: '1.02',
      },
    },
  },
  plugins: [],
};
