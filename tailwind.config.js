/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./client/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        w: {
          DEFAULT: "#FFFFFF",
          dark: "#D8D8D8",
          darker: "#a7a7a7",
        },
        d: {
          DEFAULT: "#111111",
          light: "#1C1C1C",
          lighter: "#292929",
        },
        c: {
          DEFAULT: "#052440",
          light: "#168FFF",
        },
      },
    },
  },
  plugins: [],
};
