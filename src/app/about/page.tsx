import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import QuoteBlock from '@/components/QuoteBlock';
import ImagePlaceholder from '@/components/ImagePlaceholder';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'The story of Fishers Oysters — Shaun Fisher is building an Indigenous-led aquaculture enterprise on Quandamooka country, Moreton Bay.',
};

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Fishers Oysters"
        subtitle="Our story"
        variant="page"
      />

      {/* Origin Story */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-primary">How It Started</h2>
            <p>
              Shaun Fisher is a Quandamooka man who started an oyster enterprise with
              $500 and four leases in Moreton Bay, off Minjerribah (North Stradbroke
              Island). No investors, no business plan — just sea country knowledge,
              hard work, and a belief that Indigenous people should be leading
              aquaculture on their own waters.
            </p>
            <p>
              Fishers Oysters grows premium oysters while restoring the
              reef ecosystems that have sustained Quandamooka people for tens of
              thousands of years. The long-term vision is to build a cooperative —
              bringing in more families, creating jobs for marginalised young people
              and community members who need a pathway into work.
            </p>
            <p>
              It's early days. Right now it's Shaun and a growing operation. But the
              model is designed to scale through community, not through corporate
              investment.
            </p>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="section bg-white pb-0">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <ImagePlaceholder alt="Shaun Fisher on the oyster leases, Moreton Bay" />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section bg-white">
        <div className="container">
          <QuoteBlock
            quote="Don't start with a business plan. Start with your Elders."
            attribution="Shaun Fisher"
          />
        </div>
      </section>

      {/* Five Principles */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-primary text-center mb-12">
              Five Principles for Indigenous Aquaculture
            </h2>
            <div className="space-y-8">
              {[
                {
                  number: '01',
                  title: 'Start with Traditional Knowledge',
                  description: 'The land and sea have been managed by Indigenous peoples for millennia. Any enterprise has to begin with the knowledge systems that already exist — not imported frameworks.',
                },
                {
                  number: '02',
                  title: 'Build Collectively',
                  description: 'The goal is a cooperative — shared ownership, shared risk, shared benefit. Not one person carrying everything, but families and community working together over time.',
                },
                {
                  number: '03',
                  title: 'Integrate Knowledge Systems',
                  description: 'Traditional ecological knowledge and modern marine science aren\'t opposed — they\'re complementary. The best outcomes come from weaving them together.',
                },
                {
                  number: '04',
                  title: 'Lead on Environment',
                  description: 'Voluntary seasonal closures, habitat restoration, monitoring species return. Environmental leadership isn\'t a cost — it\'s the foundation of everything.',
                },
                {
                  number: '05',
                  title: 'Tell Your Story, Control Your Narrative',
                  description: 'Indigenous enterprises deserve to tell their own stories in their own way. Share the journey openly, on your own terms.',
                },
              ].map((principle) => (
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

      {/* The Vision — replaces Team section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-primary text-center mb-8">
              Where This Is Heading
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Right now Fishers Oysters is Shaun and the leases. But the enterprise
                is built to grow into something bigger — a cooperative model where
                multiple families share in the ownership and the work.
              </p>
              <p>
                Shaun is particularly focused on creating pathways for marginalised
                young people and community members who need work. Aquaculture is
                physical, outdoor, skilled work on country — the kind of employment
                that can change someone's trajectory.
              </p>
              <p>
                The vision is also about replication. If this model works on
                Quandamooka country, it can work on other coastal Indigenous country
                too. The cooperative structure, the integration of traditional
                knowledge, the environmental approach — it's all designed to be shared.
              </p>
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
                <ImagePlaceholder alt="Shaun Fisher" aspect="square" className="w-40 h-40 md:w-48 md:h-48" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                  Shaun Fisher
                </h3>
                <p className="text-primary mb-4">Founder</p>
                <p className="text-gray-600 leading-relaxed">
                  Quandamooka man, aquaculturist, and social enterprise builder.
                  Shaun started Fishers Oysters to prove that Indigenous communities
                  can lead sustainable marine industries on their own country — and
                  create real economic pathways for people who need them most.
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
            Want to Be Part of It?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you want to buy oysters, partner with us, or just learn
            more about what we're building — reach out.
          </p>
          <a href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
