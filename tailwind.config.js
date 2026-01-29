/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    container: {
      screens: {
        xl: "1280px"
      }
    },
    extend: {},
  },
  plugins: [],
}

