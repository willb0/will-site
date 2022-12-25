/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

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
            code: {
              fontFamily: "JetBrains Mono, monospace",
              span: {
                fontFamily: "JetBrains Mono, monospace",
              },
            },
            "div[data-remark-code-title]": {
              backgroundColor: colors.zinc[800],
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.75rem",
              padding: "0.5rem 1rem",
              borderTopRightRadius: "0.25rem",
              borderTopLeftRadius: "0.25rem",
            },
            "div[data-remark-code-title] + pre": {
              marginTop: "0 !important",
              borderTopRightRadius: "0 !important",
              borderTopLeftRadius: "0 !important",
            },
            "p, li, h1": {
              code: {
                backgroundColor: colors.zinc[800],
                padding: "0.250rem 0.4rem",
                borderRadius: "0.250rem",
                fontWeight: "300",
                color: "white",
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
  plugins: [require("@tailwindcss/typography")],
};
