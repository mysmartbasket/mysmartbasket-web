/*
 * Google Consent Mode v2 (default state) — must run before gtag.js on every
 * page (SPA and static). No analytics cookies are set until the visitor
 * accepts the cookie banner (msb_ad_consent in localStorage; the key keeps
 * its old name so answers given while the site ran ads are still honoured).
 *
 * The site shows no advertising, so the ad_* flags always stay 'denied'.
 *
 * ConsentBanner (src/App.tsx) and consent-banner.js call
 * gtag('consent', 'update', ...) once the visitor responds; each page
 * separately calls gtag('config', ...) for its own Measurement ID.
 */
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
window.gtag = gtag;

gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
});

try {
  if (window.localStorage.getItem('msb_ad_consent') === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {
  /* ignore (private mode / storage blocked) */
}
