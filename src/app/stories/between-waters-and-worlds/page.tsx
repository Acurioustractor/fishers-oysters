import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import copy from '@/content/site-copy.json';

export const metadata: Metadata = {
  title: copy.storyDetail.metadataTitle,
  description: copy.storyDetail.metadataDescription,
};

export default function BetweenWatersStory() {
  const sections = copy.storyDetail.sections;

  return (
    <>
      {/* Hero image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src="/images/walking-to-boat.jpg"
          alt="Walking across Moreton Bay shallows toward the boat"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-12">
            <p className="text-white/80 text-sm mb-2">{copy.storyDetail.date}</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white max-w-3xl">
              {copy.storyDetail.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Story body */}
      <article className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="lead text-xl text-gray-600">
              {copy.storyDetail.lead}
            </p>

            <h2 className="text-primary">{sections[0].heading}</h2>
            {sections[0].paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* Full-width image break */}
          <div className="max-w-4xl mx-auto my-12">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/aerial-oyster-leases.jpg"
                alt="Aerial view of the oyster leases, Moreton Bay"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              {copy.storyDetail.imageCaption}
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-lg">
            {sections.slice(1, 3).map((section) => (
              <section key={section.heading}>
                <h2 className="text-primary">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          {/* Image pair */}
          <div className="max-w-4xl mx-auto my-12 grid md:grid-cols-2 gap-4">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/oyster-tripods.jpg"
                alt="Oyster lease tripods at low tide"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/inspecting-spat.jpg"
                alt="Inspecting oyster spat baskets"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-primary">{sections[3].heading}</h2>
            {sections[3].paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* Full-width image */}
          <div className="max-w-4xl mx-auto my-12">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/working-oyster-baskets.jpg"
                alt="Shaun working the oyster baskets in Moreton Bay"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto prose prose-lg">
            {sections.slice(4).map((section) => (
              <section key={section.heading}>
                <h2 className="text-primary">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <blockquote>
              <p>
                {copy.storyDetail.quote}
              </p>
            </blockquote>
          </div>

          {/* Back link */}
          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t">
            <Link
              href="/stories"
              className="text-primary hover:underline font-medium"
            >
              &larr; {copy.storyDetail.backLink}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
