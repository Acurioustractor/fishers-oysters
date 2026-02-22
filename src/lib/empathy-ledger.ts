/**
 * Empathy Ledger Integration
 *
 * Fetches stories from Empathy Ledger v1 Content Hub API.
 * Uses project-scoped endpoint to only return Fisher's Oysters stories.
 */

export interface Story {
  id: string;
  title: string;
  excerpt?: string;
  quote?: string;
  storyteller?: string;
  coverImage?: string;
  url?: string;
  publishedAt?: string;
  tags?: string[];
}

export interface Storyteller {
  id: string;
  name: string;
  bio?: string;
  photo?: string;
  stories: Story[];
}

const API_BASE = process.env.EMPATHY_LEDGER_API_BASE || 'https://empathy-ledger-v2.vercel.app/api';
const PROJECT_SLUG = process.env.EMPATHY_LEDGER_PROJECT_SLUG || 'fishers-oysters';

interface GetStoriesOptions {
  limit?: number;
  offset?: number;
  storytellerId?: string;
}

interface ContentHubStory {
  id: string;
  title: string;
  summary?: string;
  authorName?: string;
  publishedAt?: string;
  themes?: { name: string }[];
  isPublic?: boolean;
}

/**
 * Fetch stories for this project from Empathy Ledger Content Hub
 */
export async function getStories(options: GetStoriesOptions = {}): Promise<Story[]> {
  const { limit = 10 } = options;

  try {
    const response = await fetch(
      `${API_BASE}/v1/content-hub/stories?project=${PROJECT_SLUG}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      console.error('Empathy Ledger API error:', response.status);
      return [];
    }

    const data = await response.json();
    const stories: Story[] = (data.stories || [])
      .slice(0, limit)
      .map((s: ContentHubStory) => ({
        id: s.id,
        title: s.title,
        excerpt: s.summary,
        storyteller: s.authorName,
        publishedAt: s.publishedAt,
        tags: s.themes?.map((t) => t.name) || [],
      }));

    return stories;
  } catch (error) {
    console.error('Failed to fetch stories:', error);
    return [];
  }
}

/**
 * Fetch a single story by ID
 */
export async function getStory(id: string): Promise<Story | null> {
  try {
    const response = await fetch(`${API_BASE}/stories/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch story:', error);
    return null;
  }
}

/**
 * Fetch storytellers for this project
 */
export async function getStorytellers(): Promise<Storyteller[]> {
  try {
    const response = await fetch(`${API_BASE}/storytellers?project=${PROJECT_SLUG}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.storytellers || [];
  } catch (error) {
    console.error('Failed to fetch storytellers:', error);
    return [];
  }
}

/**
 * Get featured quote for homepage
 */
export async function getFeaturedQuote(): Promise<{ quote: string; attribution: string } | null> {
  const stories = await getStories({ limit: 10 });

  // Find a story with a good quote
  const storyWithQuote = stories.find((s) => s.quote && s.quote.length > 20 && s.quote.length < 200);

  if (storyWithQuote) {
    return {
      quote: storyWithQuote.quote!,
      attribution: storyWithQuote.storyteller || 'Community Member',
    };
  }

  return null;
}
