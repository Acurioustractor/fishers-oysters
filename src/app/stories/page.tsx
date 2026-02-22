import type { Metadata } from 'next';
import StoryCard from '@/components/StoryCard';
import { getStories } from '@/lib/empathy-ledger';
import type { Story } from '@/lib/empathy-ledger';
import config from '../../../project.config.json';

export const metadata: Metadata = {
  title: 'Stories',
  description: `Community voices and stories from ${config.name}`,
};

const seedStories: Story[] = [
  {
    id: 'seed-1',
    title: 'Five Principles for Indigenous Aquaculture',
    excerpt: 'From a workshop presentation by Shaun Fisher — the five principles that guide Fishers Oysters and could guide other Indigenous enterprises on sea country.',
    quote: "Don't start with a business plan. Start with your Elders.",
    storyteller: 'Shaun Fisher',
    tags: ['workshop', 'principles', 'aquaculture'],
  },
  {
    id: 'seed-2',
    title: 'Weaving Old Knowledge and New Technology',
    excerpt: 'How the next generation at Fishers Oysters combines traditional ecological knowledge with app development, marine biology, and modern aquaculture science.',
    quote: "These young people aren't choosing between traditional knowledge and modern technology. They're weaving them together.",
    storyteller: 'Shaun Fisher',
    tags: ['youth', 'innovation', 'technology'],
  },
  {
    id: 'seed-3',
    title: 'The Sea Country Has Been Waiting',
    excerpt: 'The story of returning to Quandamooka sea country — restoring oyster reefs, rebuilding cultural connection, and creating economic sovereignty from $500.',
    quote: 'The sea country has been waiting for us to come home.',
    storyteller: 'Shaun Fisher',
    tags: ['culture', 'origin', 'country'],
  },
];

export default async function StoriesPage() {
  const apiStories = await getStories();
  const stories = apiStories.length > 0 ? apiStories : seedStories;

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
