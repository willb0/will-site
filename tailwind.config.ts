/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            "p, li, h1": {
              code: {
                backgroundColor: "#27272a",
                padding: "0.250rem 0.4rem",
                borderRadius: "0.250rem",
                fontWeight: "300",
                color: "white",
                transitionProperty: "color, background-color",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "150ms",
                border: "1px solid #3f3f46",
              },
            },
            "html:not(.dark) p, li, h1": {
              code: {
                backgroundColor: "#e4e4e7",
                padding: "0.250rem 0.4rem",
                borderRadius: "0.250rem",
                fontWeight: "300",
                color: "black",
                transitionProperty: "color, background-color",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "150ms",
                border: "1px solid #d4d4d8",
              },
            },
          },
        },
      },
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
