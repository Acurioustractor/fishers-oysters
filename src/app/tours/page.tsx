import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import QuoteBlock from '@/components/QuoteBlock';
import Gallery from '@/components/Gallery';
import copy from '@/content/site-copy.json';

export const metadata: Metadata = {
  title: copy.tours.metadataTitle,
  description: copy.tours.metadataDescription,
};

export default function ToursPage() {
  return (
    <>
      <Hero
        title={copy.tours.hero.title}
        subtitle={copy.tours.hero.subtitle}
        variant="page"
      />

      {/* Tour Description */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="lead text-xl text-gray-600">
              {copy.tours.intro[0]}
            </p>
            {copy.tours.intro.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-heading text-center text-primary mb-12">
            {copy.tours.expect.heading}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {copy.tours.expect.items.map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Images */}
      <section className="section">
        <div className="container">
          <Gallery
            columns={2}
            images={[
              { src: '/images/walking-to-boat.jpg', alt: 'Walking the oyster leases at low tide' },
              { src: '/images/group-oyster-flats.jpg', alt: 'Group tour on the oyster flats' },
              { src: '/images/aerial-oyster-leases.jpg', alt: 'Moreton Bay from above' },
              { src: '/images/inspecting-spat.jpg', alt: 'Inspecting oyster spat on country' },
            ]}
          />
        </div>
      </section>

      {/* Quote */}
      <section className="section bg-white">
        <div className="container">
          <QuoteBlock
            quote={copy.tours.quote.text}
            attribution={copy.tours.quote.attribution}
          />
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            {copy.tours.cta.heading}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {copy.tours.cta.text}
          </p>
          <a href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            {copy.tours.cta.button}
          </a>
        </div>
      </section>
    </>
  );
}
