import type { Metadata } from 'next';
import StoryCard from '@/components/StoryCard';
import type { Story } from '@/lib/empathy-ledger';
import copy from '@/content/site-copy.json';

export const metadata: Metadata = {
  title: copy.stories.metadataTitle,
  description: copy.stories.metadataDescription,
};

const featuredStory: Story = {
  id: copy.stories.featuredStory.id,
  title: copy.stories.featuredStory.title,
  excerpt: copy.stories.featuredStory.excerpt,
  coverImage: copy.stories.featuredStory.coverImage,
  storyteller: copy.stories.featuredStory.storyteller,
  url: copy.stories.featuredStory.url,
  publishedAt: copy.stories.featuredStory.publishedAt,
  tags: copy.stories.featuredStory.tags,
};

export default async function StoriesPage() {
  // TODO: Re-enable when real stories are added to Empathy Ledger
  // const apiStories = await getStories();
  const stories = [featuredStory];

  return (
    <>
      {/* Hero */}
      <section className="section bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {copy.stories.hero.title}
            </h1>
            <p className="text-xl opacity-90">
              {copy.stories.hero.text}
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* Empathy Ledger Credit */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="container text-center">
          <p className="text-sm text-gray-500">
            {copy.stories.credit.prefix}{' '}
            <a
              href="https://empathy-ledger-v2.vercel.app"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.stories.credit.linkLabel}
            </a>{' '}
            - {copy.stories.credit.suffix}
          </p>
        </div>
      </section>
    </>
  );
}
