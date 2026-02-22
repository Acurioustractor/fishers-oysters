import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import QuoteBlock from '@/components/QuoteBlock';
import ImagePlaceholder from '@/components/ImagePlaceholder';

export const metadata: Metadata = {
  title: 'Oyster Sales',
  description: 'Premium oysters from Moreton Bay. Wholesale enquiries and direct retail coming soon from Fishers Oysters.',
};

export default function SalesPage() {
  return (
    <>
      <Hero
        title="Oyster Sales"
        subtitle="Moreton Bay's finest oysters"
        variant="page"
      />

      {/* Product Info */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="lead text-xl text-gray-600">
              Our oysters are grown in the tidal flows of Moreton Bay on
              Quandamooka sea country. Every dozen supports Indigenous-led
              aquaculture and reef restoration.
            </p>
            <p>
              Grown slowly in Moreton Bay, they develop a complex mineral
              flavour that reflects the character of these waters. Premium
              quality from pristine sea country.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading text-center text-primary mb-12">
              Ordering
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Wholesale */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Wholesale
                </h3>
                <p className="text-3xl font-display font-bold text-primary mb-4">
                  $16<span className="text-lg text-gray-500">/dozen</span>
                </p>
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#x2713;</span>
                    Restaurants, cafes &amp; retailers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#x2713;</span>
                    Regular supply arrangements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">&#x2713;</span>
                    Moreton Bay delivery available
                  </li>
                </ul>
                <a href="/contact" className="btn-primary w-full text-center">
                  Wholesale Enquiry
                </a>
              </div>

              {/* Direct / Retail */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-accent">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Direct Retail
                </h3>
                <p className="text-3xl font-display font-bold text-accent mb-4">
                  $24<span className="text-lg text-gray-500">/dozen</span>
                </p>
                <div className="bg-accent/10 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-secondary">
                    Coming Soon
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Direct sales and a shopfront are on the way so you can buy
                    straight from the source. Watch this space.
                  </p>
                </div>
                <a href="/contact" className="btn-outline w-full text-center">
                  Register Interest
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
            <ImagePlaceholder alt="Fresh oysters from Moreton Bay" />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section">
        <div className="container">
          <QuoteBlock
            quote="We're not just selling oysters. We're building an Indigenous brand that represents quality, country and community."
            attribution="Shaun Fisher"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Order Our Oysters
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Looking for premium oysters for your restaurant, event,
            or market? Get in touch.
          </p>
          <a href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
