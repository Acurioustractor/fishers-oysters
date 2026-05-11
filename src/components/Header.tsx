'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import config from '../../project.config.json';
import copy from '@/content/site-copy.json';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Country acknowledgement bar */}
      <div className="bg-foreground text-white/80 text-xs text-center py-1.5">
        {copy.global.countryBar}
      </div>

      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex min-w-0 items-center gap-1">
              <Image src="/images/logo-icon.png" alt="" width={80} height={64} className="-my-3 h-16 w-20 shrink-0" priority />
              <span className="truncate font-display text-lg font-bold text-primary sm:text-xl">{config.name}</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              {copy.global.navigation.map((item) =>
                item.href === '/contact' ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="btn-primary text-sm py-2 px-4"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="p-2 lg:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div id="mobile-navigation" className="border-t py-4 lg:hidden">
              {copy.global.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 ${item.href === '/contact' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
