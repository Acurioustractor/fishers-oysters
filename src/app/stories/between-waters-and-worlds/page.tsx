import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Between Waters and Worlds — A Day on Quandamooka Country',
  description:
    'A reflective account of a day spent with Shaun Fisher on Quandamooka sea country — oyster leases, cultural knowledge, and the quiet work of building something that matters.',
};

export default function BetweenWatersStory() {
  return (
    <>
      {/* Hero image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src="/images/walking-to-boat.jpg"
          alt="Walking across Moreton Bay shallows toward the boat"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-12">
            <p className="text-white/80 text-sm mb-2">25 March 2025</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white max-w-3xl">
              Between Waters and Worlds: A Day on Quandamooka Country
            </h1>
          </div>
        </div>
      </div>

      {/* Story body */}
      <article className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="lead text-xl text-gray-600">
              At 6:30am we board the Stradbroke Flyer — a pilgrimage of sorts,
              each visit deepening an understanding of a place where knowledge,
              strength, and discovery flow like the tides around the island.
            </p>

            <h2 className="text-primary">The Caretaker</h2>
            <p>
              Shaun Fisher welcomes us with the warmth that comes from deep
              belonging. While he briefly leaves to take his twins to school, we
              sit in the quiet of Minjerribah and reflect on what this place
              holds — layers of conversation with Elders and community members,
              accumulated over visits.
            </p>
            <p>
              When Shaun returns, he shows us a clearing near his oyster lease.
              He sees community gathering places, boat sheds, training
              facilities, and healing spaces — an integrated ecosystem linking
              economic prosperity with wellbeing and connection to Country.
            </p>
          </div>

          {/* Full-width image break */}
          <div className="max-w-4xl mx-auto my-12">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/aerial-oyster-leases.jpg"
                alt="Aerial view of the oyster leases, Moreton Bay"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              The oyster leases from above — Moreton Bay, Quandamooka Country
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-primary">History&rsquo;s Shadows</h2>
            <p>
              Driving across the island, Shaun describes Elders directing the
              creation of skeleton effigies to protect sacred sites threatened by
              a proposed whale research centre. The layers of complexity here run
              deep — disease decimating seventy percent of the population
              centuries ago, sand mining destroying over half the island and
              dozens of sacred sites, and ongoing pressures from privileged
              encroachment.
            </p>

            <h2 className="text-primary">Waters of Continuity</h2>
            <p>
              We pause at a natural stream Shaun has visited for decades and now
              shares with his children. It represents continuity and sustenance —
              a gathering place where generations have cooled themselves and
              harvested food. Some things endure despite everything.
            </p>
          </div>

          {/* Image pair */}
          <div className="max-w-4xl mx-auto my-12 grid md:grid-cols-2 gap-4">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/oyster-tripods.jpg"
                alt="Oyster lease tripods at low tide"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/inspecting-spat.jpg"
                alt="Inspecting oyster spat baskets"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-primary">Convergence on Salt Water</h2>
            <p>
              At the oyster farm, different streams converge — Shaun the local
              visionary, visitors carrying knowledge from other Country,
              facilitators weaving connection, and us as witnesses. Shaun
              demonstrates technique while discussing how the farm represents
              more than livelihood — it&rsquo;s a platform for cultural
              continuity, family support, and community prosperity.
            </p>
            <p>
              Tasting oysters together becomes something more than a meal. It
              becomes a ceremony of sharing wisdom, building connection, and
              continuing a story tens of thousands of years in the making.
            </p>
          </div>

          {/* Full-width image */}
          <div className="max-w-4xl mx-auto my-12">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/working-oyster-baskets.jpg"
                alt="Shaun working the oyster baskets in Moreton Bay"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-primary">Walking Together</h2>
            <p>
              As the day ends, Shaun supports an Elder as they walk back to the
              boat — a quiet image of care between knowledge holders. It says
              more than any business plan could.
            </p>

            <h2 className="text-primary">Reflection</h2>
            <p>
              On the ferry home, questions surface. Does our storytelling matter?
              Do our efforts to witness and reflect make any real difference?
            </p>
            <p>
              Perhaps the metrics of growth and resource accumulation matter less
              than showing up faithfully, ready to learn how to support young
              people and communities. Sometimes, walking alongside others in
              their journey is enough to begin with.
            </p>

            <blockquote>
              <p>
                The farm represents more than livelihood — it&rsquo;s a platform
                for cultural continuity, family support, and community
                prosperity.
              </p>
            </blockquote>
          </div>

          {/* Back link */}
          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t">
            <Link
              href="/stories"
              className="text-primary hover:underline font-medium"
            >
              &larr; Back to Stories
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
