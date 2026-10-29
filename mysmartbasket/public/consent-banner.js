/*
 * Shared cookie-consent banner for the static pages (blog, legal) that live
 * outside the React app's bundle.
 *
 * gtag.js loads unconditionally (see each page's <head> and consent-mode.js,
 * which sets Consent Mode defaults to 'denied' before it runs) — this file
 * only reacts to the visitor's choice and updates Consent Mode. Reads/writes
 * the SAME localStorage key as src/App.tsx's ConsentBanner, so a choice made
 * on the main app or on any blog page is respected everywhere without asking
 * again. The key keeps its old name (msb_ad_consent) from when the site ran
 * ads, so earlier answers still count.
 */
(function () {
  'use strict';

  var CONSENT_KEY = 'msb_ad_consent';
  var GA_MEASUREMENT_ID = 'G-MJE8ENFTPB';

  if (window.gtag) {
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
  }

  function updateConsentMode(value) {
    if (!window.gtag) return;
    window.gtag('consent', 'update', { analytics_storage: value });
  }

  function getConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      /* ignore (private mode / storage blocked) */
    }
  }

  function injectBanner() {
    if (document.getElementById('msb-consent-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'msb-consent-banner';
    banner.innerHTML =
      '<p class="msb-consent-text">Usamos cookies de analítica para medir las visitas y mejorar la web. ' +
      'Puedes aceptar o rechazar — la página funciona igual en ambos casos. ' +
      'Más info en la <a href="/privacidad.html">política de privacidad</a>.</p>' +
      '<div class="msb-consent-actions">' +
      '<button type="button" class="msb-consent-btn msb-consent-reject">Rechazar</button>' +
      '<button type="button" class="msb-consent-btn msb-consent-accept">Aceptar</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('.msb-consent-reject').addEventListener('click', function () {
      setConsent('denied');
      updateConsentMode('denied');
      banner.remove();
    });
    banner.querySelector('.msb-consent-accept').addEventListener('click', function () {
      setConsent('granted');
      updateConsentMode('granted');
      banner.remove();
    });
  }

  function init() {
    var consent = getConsent();
    if (consent !== 'granted' && consent !== 'denied') injectBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
