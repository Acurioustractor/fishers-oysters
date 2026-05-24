import type { Metadata } from 'next';
import OwnerCopyEditor from '@/components/owner/OwnerCopyEditor';
import OwnerLogin from '@/components/owner/OwnerLogin';
import {
  hasOwnerSession,
  createOwnerPreviewTokenValue,
  isOwnerLoginConfigured,
  isOwnerUsernameRequired,
  isUsingLocalDefaultPassword,
} from '@/lib/owner-auth';
import { getPublishingStatus, readCopyObject } from '@/lib/owner-copy-store';
import { getSiteHoldOverrideSource } from '@/lib/site-hold';
import { readSiteState } from '@/lib/site-state-store';

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
  const initialCopy = isSignedIn ? await readCopyObject() : null;
  const previewToken = isSignedIn ? createOwnerPreviewTokenValue() : '';
  const initialSiteState = isSignedIn ? await readSiteState() : null;

  return (
    <section className="section min-h-[70vh] bg-gray-50">
      <div className="container">
        {initialCopy && initialSiteState ? (
          <OwnerCopyEditor
            initialCopy={initialCopy}
            previewToken={previewToken}
            publishingStatus={getPublishingStatus()}
            initialSiteState={initialSiteState}
            siteHoldOverrideSource={getSiteHoldOverrideSource()}
          />
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
