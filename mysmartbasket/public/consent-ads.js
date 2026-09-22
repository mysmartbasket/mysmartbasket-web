/*
 * Shared cookie-consent banner + AdSense ad-slot loader for the static
 * pages (blog, legal) that live outside the React app's bundle.
 *
 * Mirrors src/App.tsx's ConsentBanner/AdSlot behavior and reads/writes the
 * SAME localStorage key, so a choice made on the main app or on any blog
 * page is respected everywhere without asking again.
 */
(function () {
  'use strict';

  var CONSENT_KEY = 'msb_ad_consent';
  var ADSENSE_CLIENT = 'ca-pub-8159510657807581';

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

  function renderAdSlots() {
    var slots = document.querySelectorAll('.msb-ad-slot');
    for (var i = 0; i < slots.length; i++) {
      var slot = slots[i];
      if (slot.getAttribute('data-msb-rendered') === '1') continue;
      slot.setAttribute('data-msb-rendered', '1');

      var label = document.createElement('span');
      label.className = 'msb-ad-label';
      label.textContent = 'Publicidad';

      var ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', ADSENSE_CLIENT);
      ins.setAttribute('data-ad-slot', slot.getAttribute('data-ad-slot') || 'blog_generic');
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');

      slot.appendChild(label);
      slot.appendChild(ins);

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense push failed:', e);
      }
    }
  }

  function applyConsent(value) {
    if (value === 'granted') renderAdSlots();
  }

  function injectBanner() {
    if (document.getElementById('msb-consent-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'msb-consent-banner';
    banner.innerHTML =
      '<p class="msb-consent-text">Usamos cookies para mostrar publicidad y mantener la web gratuita. ' +
      'Puedes aceptar o rechazar la personalizada — la página funciona igual en ambos casos. ' +
      'Más info en la <a href="/privacidad.html">política de privacidad</a>.</p>' +
      '<div class="msb-consent-actions">' +
      '<button type="button" class="msb-consent-btn msb-consent-reject">Rechazar</button>' +
      '<button type="button" class="msb-consent-btn msb-consent-accept">Aceptar</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('.msb-consent-reject').addEventListener('click', function () {
      setConsent('denied');
      banner.remove();
    });
    banner.querySelector('.msb-consent-accept').addEventListener('click', function () {
      setConsent('granted');
      banner.remove();
      applyConsent('granted');
    });
  }

  function init() {
    var consent = getConsent();
    if (consent === 'granted') {
      applyConsent('granted');
    } else if (consent !== 'denied') {
      injectBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
