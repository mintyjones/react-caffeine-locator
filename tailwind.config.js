// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "background" : "#121212",
        "highlightMid" : "#282828",
        "highlightHigh" : "#404040",
        "textMain" : "#f0f0f0"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}