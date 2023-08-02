const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        react: "#61DAFB",
        vue: "#42D392",
        qwik: "#AC7EF4"
      },
    },
  },
  plugins: [],
}

