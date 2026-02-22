import type { Story } from '@/lib/empathy-ledger';

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <article className="card">
      {/* Image */}
      {story.coverImage && (
        <div className="aspect-video relative overflow-hidden">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
          {story.title}
        </h3>

        {/* Storyteller */}
        {story.storyteller && (
          <p className="text-sm text-primary mb-3">
            {story.storyteller}
          </p>
        )}

        {/* Excerpt */}
        {story.excerpt && (
          <p className="text-gray-600 line-clamp-3 mb-4">{story.excerpt}</p>
        )}

        {/* Quote */}
        {story.quote && (
          <blockquote className="border-l-4 border-accent pl-4 italic text-gray-700 mb-4">
            "{story.quote}"
          </blockquote>
        )}

        {/* Link */}
        {story.url && (
          <a
            href={story.url}
            className="text-primary font-medium hover:underline"
            {...(story.url.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          >
            Read Full Story &rarr;
          </a>
        )}
      </div>
    </article>
  );
}
