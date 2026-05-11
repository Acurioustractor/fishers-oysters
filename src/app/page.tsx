import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import OfferingCard from '@/components/OfferingCard';
import QuoteBlock from '@/components/QuoteBlock';
import StatsBar from '@/components/StatsBar';
import copy from '@/content/site-copy.json';

export const metadata: Metadata = {
  description: copy.home.metadataDescription,
};

export default function HomePage() {
  return (
    <>
      <Hero
        title={copy.home.hero.title}
        description={copy.home.hero.description}
        backgroundImage="/images/aerial-oyster-leases.jpg"
        cta={{ label: copy.home.hero.primaryCta, href: '/about' }}
        secondaryCta={{ label: copy.home.hero.secondaryCta, href: '/contact' }}
        variant="home"
      />

      <StatsBar stats={copy.home.stats} />

      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-wide text-secondary mb-3">
              {copy.home.offeringsIntro.eyebrow}
            </p>
            <h2 className="section-heading text-primary">
              {copy.home.offeringsIntro.heading}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {copy.home.offeringsIntro.text}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {copy.home.offerings.map((offering) => (
              <OfferingCard key={offering.title} {...offering} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-secondary mb-3">
                {copy.home.work.eyebrow}
              </p>
              <h2 className="section-heading text-primary">
                {copy.home.work.heading}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {copy.home.work.text}
              </p>

              <div className="space-y-4">
                {copy.home.work.points.map((point) => (
                  <div key={point} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-white">
                      &#x2713;
                    </span>
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>

              <Link href="/culture" className="btn-outline mt-8">
                {copy.home.work.button}
              </Link>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/images/working-flats.jpg"
                alt="Working the oyster flats on Quandamooka Sea Country"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:order-first">
              <Image
                src="/images/oyster-tripods.jpg"
                alt="Oyster farm structures in Moreton Bay"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-secondary mb-3">
                {copy.home.access.eyebrow}
              </p>
              <h2 className="section-heading text-primary">
                {copy.home.access.heading}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {copy.home.access.text}
              </p>

              <div className="grid grid-cols-2 gap-6">
                {copy.home.access.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-4xl font-display font-bold text-primary">{metric.value}</div>
                    <p className="mt-2 text-sm uppercase tracking-wide text-gray-600">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <QuoteBlock
            quote={copy.home.quote.text}
            attribution={copy.home.quote.attribution}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-wide text-secondary mb-3">
              {copy.home.gallery.eyebrow}
            </p>
            <h2 className="section-heading text-primary">
              {copy.home.gallery.heading}
            </h2>
          </div>
          <Gallery
            columns={3}
            images={[
              { src: '/images/between-lease-poles.jpg', alt: 'Oyster lease poles in Moreton Bay' },
              { src: '/images/working-oyster-baskets.jpg', alt: 'Working oyster baskets on the leases' },
              { src: '/images/group-oyster-flats.jpg', alt: 'Group experience on the oyster flats' },
            ]}
          />
        </div>
      </section>

      <section className="section bg-primary text-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {copy.home.cta.heading}
              </h2>
              <p className="text-lg opacity-90 max-w-2xl">
                {copy.home.cta.text}
              </p>
            </div>
            <Link href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
              {copy.home.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
