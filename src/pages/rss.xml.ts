import rss from '@astrojs/rss';

export const get = () => rss({
  title: 'Will Bell',
  description: "I'm a data boi",
  site: import.meta.env.SITE,
  items: import.meta.glob('./blog/**.mdx'),
});