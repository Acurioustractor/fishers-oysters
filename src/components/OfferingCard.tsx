import Link from 'next/link';
import copy from '@/content/site-copy.json';
import { getIcon } from './Icons';

interface OfferingCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export default function OfferingCard({ title, description, href, icon }: OfferingCardProps) {
  return (
    <Link href={href} className="offering-card group block">
      <div className="offering-icon">
        {getIcon(icon, 'w-full h-full')}
      </div>
      <h3 className="text-xl font-display font-bold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      <span className="text-primary font-medium group-hover:underline">
        {copy.home.offeringLinkLabel} &rarr;
      </span>
    </Link>
  );
}
