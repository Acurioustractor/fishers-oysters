import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import OfferingCard from '@/components/OfferingCard';
import QuoteBlock from '@/components/QuoteBlock';
import Gallery from '@/components/Gallery';
import config from '../../project.config.json';

export default function HomePage() {
  const hero = config.content?.hero;
  const cta = config.content?.cta;
  const stats = config.content?.stats;
  const offerings = config.content?.offerings;
  const quote = config.content?.quote;

  return (
    <>
      {/* Hero */}
      <Hero
        title={hero?.heading || config.name}
        subtitle={hero?.subheading || config.tagline}
        cta={hero?.cta}
        variant="home"
        video={{
          desktop: '/video/hero-desktop.mp4',
          mobile: '/video/hero-mobile.mp4',
          poster: '/video/hero-poster.jpg',
        }}
      />

      {/* Stats Bar */}
      {stats && <StatsBar stats={stats} />}

      {/* Offerings */}
      {offerings && (
        <section className="section">
          <div className="container">
            <h2 className="section-heading text-center text-primary mb-12">
              What We Do
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {offerings.map((offering, i) => (
                <OfferingCard key={i} {...offering} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote */}
      {quote && (
        <section className="section bg-white">
          <div className="container">
            <QuoteBlock quote={quote.text} attribution={quote.attribution} />
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading text-center text-primary mb-12">
            From the Water
          </h2>
          <Gallery
            images={[
              { src: '/images/aerial-oyster-leases.jpg', alt: 'Oyster leases at low tide, Moreton Bay' },
              { src: '/images/fisher-portrait.jpg', alt: 'Shaun Fisher on the oyster flats' },
              { src: '/images/working-oyster-baskets.jpg', alt: 'Working the oyster baskets' },
              { src: '/images/between-lease-poles.jpg', alt: 'Working between oyster lease poles' },
              { src: '/images/group-oyster-flats.jpg', alt: 'Team on the oyster flats' },
              { src: '/images/oyster-tripods.jpg', alt: 'Oyster lease tripods at low tide' },
            ]}
          />
        </div>
      </section>

      {/* About Preview */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading text-primary">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Shaun Fisher, a Mununjali, Gorenpul Man, started Fisher&rsquo;s Oysters with $500 and four oyster leases
              in Moreton Bay. The goal: build an Indigenous-led aquaculture enterprise
              on Quandamooka country that restores reef ecosystems and creates real
              jobs for community, especially young people and those who need a pathway.
            </p>
            <a href="/about" className="btn-outline">
              Read our story &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {cta?.heading || 'The Sea Country Has Been Waiting'}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {cta?.text || "Whether you want to order oysters, book a tour, or support Indigenous-led aquaculture — we'd love to hear from you."}
          </p>
          <a
            href={cta?.button?.href || '/contact'}
            className="btn bg-white text-primary hover:bg-gray-100"
          >
            {cta?.button?.label || 'Contact Us'}
          </a>
        </div>
      </section>
    </>
  );
}
