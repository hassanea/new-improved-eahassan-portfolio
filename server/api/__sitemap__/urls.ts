// // @ts-ignore
// import { defineSitemapEventHandler } from '@nuxtjs/seo';
// // @ts-ignore
import type { SitemapUrlInput } from '#sitemap/types';

// Reference: https://www.youtube.com/watch?v=hxdD4de2lxg
// Documentation: https://nuxtseo.com/docs/sitemap/guides/dynamic-urls

// defineSitemapEventHandler(callback)
// -is special function provided by nuxt-seo/sitemap that generates the dynamic urls of your website's sitemap.xml file.
// For example, in this case: /projects/:id => { loc: /projects/:id }, ... etc.
// -defineSitemapEventHandler is very similar to defineEventHandler.

export default defineSitemapEventHandler(async () => {
  const { projects } = await $fetch('/api/projects');
  // @ts-ignore
  const sitemapUrls: SitemapUrlInput[] = projects.map((project: any) => ({
    // loc stands for location of the URL
    loc: `/projects/${project.id}`,
    _sitemap: 'pages',
    //  lastmod: new Date(),
  }));
  return sitemapUrls satisfies SitemapUrlInput[];
});
