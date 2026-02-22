import type { Metadata } from 'next';
import StoryCard from '@/components/StoryCard';
import { getStories } from '@/lib/empathy-ledger';
import type { Story } from '@/lib/empathy-ledger';
import config from '../../../project.config.json';

export const metadata: Metadata = {
  title: 'Stories',
  description: `Community voices and stories from ${config.name}`,
};

const featuredStory: Story = {
  id: 'featured-1',
  title: 'Between Waters and Worlds: A Day on Quandamooka Country',
  excerpt: 'A reflective account of a day spent with Shaun Fisher on Quandamooka sea country — oyster leases, cultural knowledge, and the quiet work of building something that matters.',
  coverImage: '/images/walking-to-boat.jpg',
  storyteller: 'Benjamin Knight',
  url: '/stories/between-waters-and-worlds',
  publishedAt: '2025-03-25',
  tags: ['culture', 'country', 'aquaculture'],
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
              Community Voices
            </h1>
            <p className="text-xl opacity-90">
              Real stories from the people at the heart of our work.
              Every voice matters, every story shapes our journey.
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
            Stories ethically captured and shared through{' '}
            <a
              href="https://empathy-ledger-v2.vercel.app"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Empathy Ledger
            </a>{' '}
            - consent-first storytelling
          </p>
        </div>
      </section>
    </>
  );
}
