/*
 * Google Consent Mode v2 (default state) — must run before gtag.js and
 * adsbygoogle.js on every page (SPA and static), so Google's crawlers can
 * always detect the ad/analytics scripts for AdSense site verification,
 * while no ad or analytics cookies are actually set until the visitor
 * accepts the cookie banner (msb_ad_consent in localStorage).
 *
 * ConsentBanner (src/App.tsx) and consent-ads.js call
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
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  }
} catch (e) {
  /* ignore (private mode / storage blocked) */
}
