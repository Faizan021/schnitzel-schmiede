import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'Google-Extended'],
        allow: '/',
      },
    ],
    sitemap: 'https://schnitzel-schmiede-mg.de/sitemap.xml',
  };
}
