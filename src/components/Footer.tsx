import Link from 'next/link';
import Image from 'next/image';
import config from '../../project.config.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Acknowledgement of Country */}
      <div className="bg-gray-800 py-6">
        <div className="container">
          <p className="text-sm text-gray-400 max-w-3xl">
            <strong className="text-gray-300">Acknowledgement of Country:</strong>{' '}
            Fishers Oysters operates on the lands and waters of the Quandamooka people of
            Minjerribah (North Stradbroke Island) and Moreton Bay. We pay our respects to
            Elders past, present and emerging, and acknowledge that sovereignty was never ceded.
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Image src="/images/logo-full.png" alt={config.name} width={220} height={100} className="mb-4" />
            <p className="text-sm text-gray-400">
              {config.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              {config.navigation.map((item) => (
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
            <h4 className="font-medium text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {config.contact?.email && (
                <li>
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {config.contact.email}
                  </a>
                </li>
              )}
              {config.contact?.phone && (
                <li>
                  <a
                    href={`tel:${config.contact.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {config.contact.phone}
                  </a>
                </li>
              )}
              {config.contact?.address && (
                <li className="text-gray-500">
                  {config.contact.address}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500 text-center">
          <p>&copy; {currentYear} {config.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
