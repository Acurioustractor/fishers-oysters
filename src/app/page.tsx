import Image from 'next/image';

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <Image
        src="/images/aerial-oyster-leases.jpg"
        alt="Oyster leases in Moreton Bay"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-display text-white text-4xl md:text-5xl tracking-[0.15em] font-bold mb-2">
          FISHER&rsquo;S OYSTERS
        </h1>
        <p className="text-white/80 font-display text-2xl md:text-3xl tracking-wide mt-10">
          Coming Soon
        </p>
      </div>
    </div>
  );
}
