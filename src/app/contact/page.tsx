import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Hero from '@/components/Hero';
import config from '../../../project.config.json';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Fishers Oysters — wholesale orders, tour bookings, partnerships, and general enquiries.',
};

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Get in Touch"
        subtitle="We'd love to hear from you"
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
                Contact Information
              </h2>

              {config.contact?.email && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="text-primary hover:underline"
                  >
                    {config.contact.email}
                  </a>
                </div>
              )}

              {config.contact?.phone && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                  <a
                    href={`tel:${config.contact.phone}`}
                    className="text-primary hover:underline"
                  >
                    {config.contact.phone}
                  </a>
                </div>
              )}

              {config.contact?.address && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">{config.contact.address}</p>
                </div>
              )}

              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-2">
                  What to expect
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We'll get back to you within a few business days. For wholesale
                  orders, please include your venue name and estimated volume.
                  For tour enquiries, let us know your preferred dates and group size.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
