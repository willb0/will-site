import rss from '@astrojs/rss';

export const get = () => rss({
  title: 'Will Bell',
  description: "will's website",
  site: import.meta.env.SITE,
  items: import.meta.glob('./blog/**.mdx'),
});