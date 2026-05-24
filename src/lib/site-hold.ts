import siteState from '@/content/site-state.json';

export type SiteHoldOverrideSource = 'env-on' | 'env-off' | 'file';

export function isPublicHoldEnabled() {
  if (process.env.SITE_HOLD === 'off') return false;
  if (process.env.SITE_HOLD === 'on') return true;

  return Boolean((siteState as { publicHold?: boolean }).publicHold);
}

export function getSiteHoldOverrideSource(): SiteHoldOverrideSource {
  if (process.env.SITE_HOLD === 'off') return 'env-off';
  if (process.env.SITE_HOLD === 'on') return 'env-on';
  return 'file';
}
