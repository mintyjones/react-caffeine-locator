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
    boxShadow: {
      DEFAULT: '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06)'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}