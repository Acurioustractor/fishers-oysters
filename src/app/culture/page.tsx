import type { Metadata } from 'next';
import Image from 'next/image';
import Hero from '@/components/Hero';
import QuoteBlock from '@/components/QuoteBlock';

export const metadata: Metadata = {
  title: 'Culture, Justice & Jobs',
  description: 'Fishers Oysters is building pathways for marginalised young people and community through Indigenous-led aquaculture on Quandamooka country.',
};

export default function CulturePage() {
  return (
    <>
      <Hero
        title="Culture, Justice & Jobs"
        subtitle="Creating pathways, restoring sovereignty"
        variant="page"
      />

      {/* The Problem */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-primary">The Problem</h2>
            <p>
              Eighty percent of oyster leases in Queensland are locked by corporate
              interests. Indigenous communities, the original custodians of these
              waters, are largely shut out of the aquaculture industry despite tens
              of thousands of years of sustainable marine management.
            </p>
            <p>
              At the same time, marginalised young people and community members in
              Indigenous communities lack pathways into meaningful work, especially
              work that connects to country and culture.
            </p>
            <p>
              Fishers Oysters exists to address both problems at once.
            </p>
          </div>
        </div>
      </section>

      {/* Jobs & Pathways */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-primary">Jobs That Matter</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Aquaculture is physical, outdoor, skilled work on country. It's the
                kind of work that can change someone's trajectory, especially young
                people who haven't found their place in conventional employment.
              </p>
              <p>
                Shaun is building Fishers Oysters with a deliberate focus on creating
                jobs for marginalised young people and community members who need work.
                Not charity jobs. Real positions in a real enterprise that happens to
                grow premium oysters and restore reef ecosystems.
              </p>
              <p>
                As the enterprise grows into a cooperative, the goal is for workers
                to become owners, sharing in the decisions, the risk, and the returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section">
        <div className="container">
          <QuoteBlock
            quote="These young people aren't choosing between traditional knowledge and modern technology. They're weaving them together."
            attribution="Shaun Fisher"
          />
        </div>
      </section>

      {/* Environmental Leadership */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-primary">Environmental Leadership</h2>
            <p>
              Looking after country isn't separate from the business. It is the
              business. Fishers Oysters takes an Elder-guided approach to
              environmental management:
            </p>
            <ul>
              <li>
                <strong>Voluntary seasonal closures</strong>: resting leases when
                the ecosystem needs it, even when regulations don't require it.
              </li>
              <li>
                <strong>Reef restoration</strong>: oyster farming actively rebuilds
                reef habitat that supports broader marine biodiversity.
              </li>
              <li>
                <strong>Traditional indicators</strong>: reading country the way
                Quandamooka people always have, alongside modern monitoring methods.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image src="/images/working-flats.jpg" alt="Working on country — aquaculture on Quandamooka sea country" fill className="object-cover" sizes="(max-width: 896px) 100vw, 896px" />
            </div>
          </div>
        </div>
      </section>

      {/* Replication */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-primary">A Model for Others</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Fishers Oysters isn't just one enterprise. It's being built as a
                model, a cooperative template that other coastal Indigenous
                communities can adapt for their own sea country.
              </p>
              <p>
                If you're from a coastal Indigenous community interested in
                aquaculture, or an organisation that supports Indigenous enterprise,
                Shaun wants to hear from you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Get Involved
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you're a potential partner, a young person looking for a
            pathway, or a community exploring aquaculture, reach out.
          </p>
          <a href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
