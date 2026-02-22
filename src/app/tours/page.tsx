import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import QuoteBlock from '@/components/QuoteBlock';
import Gallery from '@/components/Gallery';

export const metadata: Metadata = {
  title: 'Oyster Tours',
  description: 'Experience Quandamooka sea country with Fishers Oysters. Walk the leases, learn about sustainable aquaculture, and taste fresh Moreton Bay oysters.',
};

export default function ToursPage() {
  return (
    <>
      <Hero
        title="Oyster Tours"
        subtitle="Experience our sea country"
        variant="page"
      />

      {/* Tour Description */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="lead text-xl text-gray-600">
              Come onto Quandamooka sea country and experience aquaculture guided
              by the people who have cared for these waters for tens of thousands
              of years.
            </p>
            <p>
              Shaun takes groups out onto the leases in Moreton Bay — you'll see
              how oysters are grown, hear about the connection between
              aquaculture and cultural practice, and taste oysters fresh from the
              water.
            </p>
            <p>
              This isn't a polished tourism product. It's a real working operation
              on real country, shared by the person who built it. You'll leave
              understanding why Indigenous-led aquaculture matters.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-heading text-center text-primary mb-12">
            What to Expect
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Walk the Leases',
                description: 'Get out onto the oyster leases in Moreton Bay and see how oysters are grown.',
              },
              {
                title: 'Quandamooka Culture',
                description: 'Hear about the cultural connection to sea country — the knowledge behind the aquaculture.',
              },
              {
                title: 'Fresh Oyster Tasting',
                description: 'Taste oysters straight from the water. There\'s nothing like it.',
              },
              {
                title: 'Sustainable Aquaculture',
                description: 'Learn how oyster farming restores reef ecosystems and supports marine biodiversity.',
              },
              {
                title: 'Small Groups',
                description: 'Intimate group sizes for a personal experience. (Group size TBC — get in touch to discuss)',
              },
              {
                title: 'Getting There',
                description: 'Minjerribah (North Stradbroke Island), accessible by ferry from Brisbane. (Logistics TBC)',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
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
            quote="The sea country has been waiting for us to come home."
            attribution="Shaun Fisher"
          />
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Book a Tour
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Interested in visiting? Get in touch to arrange a tour for your
            group, school, or organisation.
          </p>
          <a href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            Enquire Now
          </a>
        </div>
      </section>
    </>
  );
}
