import type { MetadataRoute } from 'next';
import { isPublicHoldEnabled } from '@/lib/site-hold';

const BASE_URL = 'https://www.fishersoysters.com';

/**
 * Public pages that are about the business, the oysters and how to reach
 * them. Every path here is a static page with no database behind it.
 */
const PUBLIC_PATHS = ['/', '/about', '/sales', '/culture', '/contact'];

/**
 * Deliberately NOT listed, and why:
 *
 *   /coming-soon                      the hold page, already noindex.
 *   /owner                            owner login and copy editor, already noindex.
 *   /api/*                            contact form, owner and upload endpoints.
 *   /stories                          renders a 404 (stories are switched off).
 *   /stories/between-waters-and-worlds  renders a 404, and it is a person's story.
 *   /tours                            redirects to /contact, so /contact is listed instead.
 *
 * The 20 files in src/content/stories hold people's stories. They are not
 * rendered by any page and must never be added here without the storyteller's
 * say-so.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // While the public hold is on, middleware rewrites every page to the
  // noindex /coming-soon screen, so there is nothing to point crawlers at.
  if (isPublicHoldEnabled()) return [];

  return PUBLIC_PATHS.map((path) => ({
    url: path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`,
  }));
}
