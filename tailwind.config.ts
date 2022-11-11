/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "inter": "Inter, Arial, sans-serif",
      },
      gridTemplateColumns: {
        1: "repeat(auto-fit, minmax(24ch, 1fr));",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/typography")],
};
