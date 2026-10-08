import type { MetadataRoute } from 'next';

// No robots.txt existed before this file, which meant everything was allowed.
// The rule below keeps exactly that and only adds the sitemap line.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.fishersoysters.com/sitemap.xml',
  };
}
