/**
 * Empathy Ledger Integration
 *
 * Fetches stories and storyteller data from Empathy Ledger API.
 * Respects consent - only shows stories with EXTERNAL consent scope.
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

const API_URL = process.env.EMPATHY_LEDGER_API_URL || 'https://empathy-ledger-v2.vercel.app/api';
const PROJECT_SLUG = process.env.EMPATHY_LEDGER_PROJECT_SLUG || 'fishers-oysters';

interface GetStoriesOptions {
  limit?: number;
  offset?: number;
  storytellerId?: string;
}

/**
 * Fetch stories for this project from Empathy Ledger
 */
export async function getStories(options: GetStoriesOptions = {}): Promise<Story[]> {
  const { limit = 10, offset = 0, storytellerId } = options;

  try {
    const params = new URLSearchParams({
      project: PROJECT_SLUG,
      limit: String(limit),
      offset: String(offset),
      consent: 'EXTERNAL', // Only external consent stories
    });

    if (storytellerId) {
      params.append('storyteller', storytellerId);
    }

    const response = await fetch(`${API_URL}/stories?${params}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Empathy Ledger API error:', response.status);
      return [];
    }

    const data = await response.json();
    return data.stories || [];
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
    const response = await fetch(`${API_URL}/stories/${id}`, {
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
    const response = await fetch(`${API_URL}/storytellers?project=${PROJECT_SLUG}`, {
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
