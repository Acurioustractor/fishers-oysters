import type { Metadata } from 'next';
import Image from 'next/image';
import Hero from '@/components/Hero';
import QuoteBlock from '@/components/QuoteBlock';
import copy from '@/content/site-copy.json';

export const metadata: Metadata = {
  title: copy.culture.metadataTitle,
  description: copy.culture.metadataDescription,
};

export default function CulturePage() {
  return (
    <>
      <Hero
        title={copy.culture.hero.title}
        subtitle={copy.culture.hero.subtitle}
        variant="page"
      />

      {/* The Problem */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-primary">{copy.culture.problem.heading}</h2>
            {copy.culture.problem.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-primary">{copy.culture.jobs.heading}</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              {copy.culture.jobs.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section">
        <div className="container">
          <QuoteBlock
            quote={copy.culture.quote.text}
            attribution={copy.culture.quote.attribution}
          />
        </div>
      </section>

      {/* Environmental Leadership */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-primary">{copy.culture.environment.heading}</h2>
            <p>{copy.culture.environment.intro}</p>
            <ul>
              {copy.culture.environment.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image src="/images/working-flats.jpg" alt="Working aquaculture on Quandamooka sea country" fill className="object-cover" sizes="(max-width: 896px) 100vw, 896px" />
            </div>
          </div>
        </div>
      </section>

      {/* Sharing */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-primary">{copy.culture.sharing.heading}</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              {copy.culture.sharing.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            {copy.culture.cta.heading}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {copy.culture.cta.text}
          </p>
          <a href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            {copy.culture.cta.button}
          </a>
        </div>
      </section>
    </>
  );
}
