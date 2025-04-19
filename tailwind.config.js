/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        corben: ['var(--font-corben)'],
        inter: ['var(--font-inter)'],
        playfair: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
} 
