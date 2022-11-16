import { defineConfig } from 'astro/config';
import compress from "astro-compress";
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import mdx from '@astrojs/mdx';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
  site: 'https://lanceross.xyz',
  base: '/',
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
  integrations: [compress({
    css: true,
    html: true,
    js: true,
    img: true,
    svg: true,
  }), tailwind(), sitemap(), mdx(), image()],
});