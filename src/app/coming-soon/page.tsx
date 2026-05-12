import type { Metadata } from 'next';
import Image from 'next/image';
import copy from '@/content/site-copy.json';
import config from '../../../project.config.json';

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: "Fisher's Oysters is getting its new website ready.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComingSoonPage() {
  const email = copy.global.contact.email;
  const phone = copy.global.contact.phone;

  return (
    <section className="fixed inset-0 z-[100] isolate overflow-y-auto bg-[#132321] text-white">
      <Image
        src="/images/home-oyster-farm-reflections.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-45"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#122421]/75" />
      <div className="relative flex min-h-[100svh] items-center px-5 py-10 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <Image
              src="/images/logo-full.png"
              alt={config.name}
              width={230}
              height={100}
              priority
              className="mb-10 h-auto w-44 rounded-sm bg-white/90 px-4 py-3 shadow-sm sm:w-56"
            />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#d4a574]">
              {copy.global.countryBar}
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              New website coming soon
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
              Fisher's Oysters is getting the new site ready. For oyster sales, farm enquiries, partnerships or work opportunities, contact Shaun and the team.
            </p>
          </div>

          <div className="w-full max-w-md border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8 lg:ml-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#d4a574]">Contact</p>
            <div className="mt-5 space-y-4 text-lg">
              {email && (
                <a className="block break-words text-white underline decoration-white/35 underline-offset-4 hover:text-[#f0d5b7]" href={`mailto:${email}`}>
                  {email}
                </a>
              )}
              {phone && (
                <a className="block text-white underline decoration-white/35 underline-offset-4 hover:text-[#f0d5b7]" href={`tel:${phone}`}>
                  {phone}
                </a>
              )}
              <p className="text-base leading-relaxed text-white/75">{copy.global.contact.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
