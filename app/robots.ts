// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Kung may admin page ka na ayaw mo ma-search
    },
    sitemap: 'https://kevinmacandog.com/sitemap.xml', // Match dapat sa domain mo
  };
}