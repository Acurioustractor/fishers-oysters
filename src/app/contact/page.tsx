import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Hero from '@/components/Hero';
import copy from '@/content/site-copy.json';

export const metadata: Metadata = {
  title: copy.contact.metadataTitle,
  description: copy.contact.metadataDescription,
};

export default function ContactPage() {
  return (
    <>
      <Hero
        title={copy.contact.hero.title}
        subtitle={copy.contact.hero.subtitle}
        variant="page"
      />

      {/* Contact Form */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-display font-bold text-primary mb-6">
                {copy.contact.infoHeading}
              </h2>

              {copy.global.contact.email && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-1">{copy.contact.labels.email}</h3>
                  <a
                    href={`mailto:${copy.global.contact.email}`}
                    className="text-primary hover:underline"
                  >
                    {copy.global.contact.email}
                  </a>
                </div>
              )}

              {copy.global.contact.phone && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-1">{copy.contact.labels.phone}</h3>
                  <a href={`tel:${copy.global.contact.phone}`} className="text-primary hover:underline">
                    {copy.global.contact.phone}
                  </a>
                </div>
              )}

              {copy.global.contact.address && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-1">{copy.contact.labels.location}</h3>
                  <p className="text-gray-600">{copy.global.contact.address}</p>
                </div>
              )}

              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-2">
                  {copy.contact.expect.heading}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {copy.contact.expect.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
