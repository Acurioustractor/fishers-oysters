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
        <Image
          src="/images/logo-full.png"
          alt="Fisher's Oysters"
          width={280}
          height={100}
          className="mx-auto mb-10 brightness-0 invert"
        />
        <p className="text-white/80 font-display text-2xl md:text-3xl tracking-wide">
          Coming Soon
        </p>
      </div>
    </div>
  );
}
