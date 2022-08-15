/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'w': {
          DEFAULT: '#F9FAFB',
          dark: '#F3F4F6',
          darker: '#E5E7EB'
        },
        'b': {
          DEFAULT: '#1F2937',
          light: '#9CA3AF'
        },
        'c': {
          DEFAULT: '#92400E',
          light: '#FED78A'
        }
      }
    },
  },
  plugins: [],
}