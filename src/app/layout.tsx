import type { Metadata } from 'next';
import { Raleway, Aleo } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import config from '../../project.config.json';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const aleo = Aleo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: config.name,
    template: `%s | ${config.name}`,
  },
  description: config.description,
  openGraph: {
    title: config.name,
    description: config.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${aleo.variable} min-h-screen bg-background text-foreground font-sans`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
