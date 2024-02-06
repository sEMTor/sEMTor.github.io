/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./page/**/*.{html,js,njk}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class"
}

