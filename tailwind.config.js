/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'media',
  theme: {},
  plugins: [
    require('flowbite/plugin')
  ],
}