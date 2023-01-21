import rss from '@astrojs/rss';

export const get = () => rss({
  title: 'Lance Ross',
  description: "I'm a Next.js and Astro Enjoyer. Welcome to my digital oasis!",
  site: import.meta.env.SITE,
  items: import.meta.glob('./blog/**.mdx'),
});