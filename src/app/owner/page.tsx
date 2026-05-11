import type { Metadata } from 'next';
import OwnerCopyEditor from '@/components/owner/OwnerCopyEditor';
import OwnerLogin from '@/components/owner/OwnerLogin';
import copy from '@/content/site-copy.json';
import {
  hasOwnerSession,
  isOwnerLoginConfigured,
  isOwnerUsernameRequired,
  isUsingLocalDefaultPassword,
} from '@/lib/owner-auth';
import { getPublishingStatus } from '@/lib/owner-copy-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Owner Copy Editor',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OwnerPage() {
  const isSignedIn = await hasOwnerSession();

  return (
    <section className="section min-h-[70vh] bg-gray-50">
      <div className="container">
        {isSignedIn ? (
          <OwnerCopyEditor initialCopy={copy} publishingStatus={getPublishingStatus()} />
        ) : (
          <OwnerLogin
            isConfigured={isOwnerLoginConfigured()}
            requiresUsername={isOwnerUsernameRequired()}
            isUsingLocalDefault={isUsingLocalDefaultPassword()}
          />
        )}
      </div>
    </section>
  );
}
