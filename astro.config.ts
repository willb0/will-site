import { defineConfig } from "astro/config";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";
import astroLayouts from "astro-layouts";
import codeTitle from "remark-code-title";

// https://astro.build/config
export default defineConfig({
  site: "https://lanceross.me",
  base: "/",
  markdown: {
    extendDefaultPlugins: true,
    shikiConfig: {
      theme: "dark-plus",
    },
    remarkPlugins: [
      [
        astroLayouts,
        {
          default: "@layouts/Layout.astro",
          "pages/blog/**/*.mdx": "@layouts/BlogLayout.astro",
        },
      ],
    codeTitle],
  },
  integrations: [
    compress({
      css: true,
      html: true,
      js: true,
      img: false,
      svg: true,
      logger: 0,
    }),
    tailwind(),
    sitemap(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx(),
  ],
});
