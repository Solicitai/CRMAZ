/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        azure: {50:"#f1f7ff",100:"#e6f0ff",200:"#c9ddff",300:"#a4c6ff",400:"#7aa9ff",500:"#4f8bff",600:"#2b6bf2",700:"#1e54c7",800:"#1b3f94",900:"#172e6b"},
        coral: "#ff7a59",
        ink: "#0f172a",
        // 👇 restaura a PALETA completa do Tailwind
        slate: colors.slate
      },
      boxShadow: { soft: "0 2px 8px rgba(17, 24, 39, 0.06)" },
      borderRadius: { xl: "14px", "2xl": "18px" }
    }
  },
  plugins: []
};
