import Link from 'next/link';
import Image from 'next/image';
import config from '../../project.config.json';
import copy from '@/content/site-copy.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Acknowledgement of Country */}
      <div className="bg-gray-800 py-6">
        <div className="container">
          <p className="text-sm text-gray-400 max-w-3xl">
            <strong className="text-gray-300">{copy.global.footer.acknowledgementLabel}</strong>{' '}
            {copy.global.footer.acknowledgement}
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Image src="/images/logo-full.png" alt={config.name} width={220} height={100} className="mb-4 h-auto w-auto" />
            <p className="text-sm text-gray-400">
              {copy.global.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-white mb-4">{copy.global.footer.navigationHeading}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {copy.global.footer.homeLabel}
                </Link>
              </li>
              {copy.global.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">{copy.global.footer.contactHeading}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {copy.global.contact.email && (
                <li>
                  <a
                    href={`mailto:${copy.global.contact.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {copy.global.contact.email}
                  </a>
                </li>
              )}
              {copy.global.contact.phone && (
                <li>
                  <a
                    href={`tel:${copy.global.contact.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {copy.global.contact.phone}
                  </a>
                </li>
              )}
              {copy.global.contact.address && (
                <li className="text-gray-500">
                  {copy.global.contact.address}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500 text-center">
          <p>&copy; {currentYear} {config.name}. {copy.global.footer.copyrightSuffix}</p>
        </div>
      </div>
    </footer>
  );
}
