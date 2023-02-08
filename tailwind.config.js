/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    '../components/**/*.{html,js,vue}',
    './src/components/*.{html,js,vue}',
    './src/views/*.{html,js,vue}',
    './*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
