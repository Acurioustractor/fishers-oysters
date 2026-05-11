import type { Metadata } from 'next';
import Image from 'next/image';
import Hero from '@/components/Hero';
import QuoteBlock from '@/components/QuoteBlock';
import copy from '@/content/site-copy.json';

export const metadata: Metadata = {
  title: copy.sales.metadataTitle,
  description: copy.sales.metadataDescription,
};

export default function SalesPage() {
  const wholesale = copy.sales.ordering.cards[0];
  const retail = copy.sales.ordering.cards[1];
  const wholesalePoints = wholesale?.points ?? [];

  return (
    <>
      <Hero
        title={copy.sales.hero.title}
        subtitle={copy.sales.hero.subtitle}
        variant="page"
      />

      {/* Product Info */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="lead text-xl text-gray-600">
              {copy.sales.intro[0]}
            </p>
            {copy.sales.intro.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading text-center text-primary mb-12">
              {copy.sales.ordering.heading}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Wholesale */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {wholesale.title}
                </h3>
                <p className="text-3xl font-display font-bold text-primary mb-4">
                  {wholesale.price}
                  <span className="text-lg text-gray-500">{wholesale.unit}</span>
                </p>
                <ul className="space-y-3 text-gray-600 mb-6">
                  {wholesalePoints.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="text-primary mt-1">&#x2713;</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="btn-primary w-full text-center">
                  {wholesale.button}
                </a>
              </div>

              {/* Direct / Retail */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-accent">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {retail.title}
                </h3>
                <p className="text-3xl font-display font-bold text-accent mb-4">
                  {retail.price}
                  <span className="text-lg text-gray-500">{retail.unit}</span>
                </p>
                <div className="bg-accent/10 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-secondary">
                    {retail.badge}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {retail.description}
                  </p>
                </div>
                <a href="/contact" className="btn-outline w-full text-center">
                  {retail.button}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image src="/images/working-oyster-baskets.jpg" alt="Fresh oysters from Moreton Bay" fill className="object-cover" sizes="(max-width: 896px) 100vw, 896px" />
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section">
        <div className="container">
          <QuoteBlock
            quote={copy.sales.quote.text}
            attribution={copy.sales.quote.attribution}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            {copy.sales.cta.heading}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {copy.sales.cta.text}
          </p>
          <a href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            {copy.sales.cta.button}
          </a>
        </div>
      </section>
    </>
  );
}
