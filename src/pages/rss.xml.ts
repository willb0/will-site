import rss from '@astrojs/rss';

export const get = () => rss({
  title: 'Lance Ross',
  description: "I'm a student web dev and a JAMStack enjoyer.",
  site: import.meta.env.SITE,
  items: import.meta.glob('./blog/**.mdx'),
});