export function isPublicHoldEnabled() {
  return process.env.SITE_HOLD !== 'off';
}
