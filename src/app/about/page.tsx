import type { Metadata } from 'next';
import Image from 'next/image';
import Hero from '@/components/Hero';
import QuoteBlock from '@/components/QuoteBlock';
import copy from '@/content/site-copy.json';

export const metadata: Metadata = {
  title: copy.about.metadataTitle,
  description: copy.about.metadataDescription,
};

export default function AboutPage() {
  return (
    <>
      <Hero
        title={copy.about.hero.title}
        subtitle={copy.about.hero.subtitle}
        variant="page"
      />

      {/* Origin Story */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-primary">{copy.about.origin.heading}</h2>
            {copy.about.origin.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="section bg-white pb-0">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image src="/images/between-lease-poles.jpg" alt="Shaun Fisher on the oyster leases, Moreton Bay" fill className="object-cover" sizes="(max-width: 896px) 100vw, 896px" />
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section bg-white">
        <div className="container">
          <QuoteBlock
            quote={copy.about.quote.text}
            attribution={copy.about.quote.attribution}
          />
        </div>
      </section>

      {/* Five Principles */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-primary text-center mb-12">
              {copy.about.principles.heading}
            </h2>
            <div className="space-y-8">
              {copy.about.principles.items.map((principle) => (
                <div key={principle.number} className="flex gap-6 items-start">
                  <span className="text-4xl font-display font-bold text-accent shrink-0">
                    {principle.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next step */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-primary text-center mb-8">
              {copy.about.nextStep.heading}
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              {copy.about.nextStep.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shaun */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 md:flex md:gap-8 md:items-start">
              <div className="shrink-0 mb-6 md:mb-0">
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden">
                  <Image src="/images/fisher-portrait.jpg" alt="Shaun Fisher" fill className="object-cover" sizes="192px" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                  {copy.about.profile.name}
                </h3>
                <p className="text-primary mb-4">{copy.about.profile.role}</p>
                <p className="text-gray-600 leading-relaxed">
                  {copy.about.profile.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            {copy.about.cta.heading}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {copy.about.cta.text}
          </p>
          <a href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            {copy.about.cta.button}
          </a>
        </div>
      </section>
    </>
  );
}
