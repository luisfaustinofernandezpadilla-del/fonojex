/* FonoJex Pro · galeria.js — enlaces de WhatsApp y un solo video a la vez */
(function () {
  'use strict';
  var PHONE = '51913291289';
  var vids = [].slice.call(document.querySelectorAll('video.gv'));
  [].forEach.call(document.querySelectorAll('.wa'), function (a) {
    a.href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(a.dataset.msg || 'Hola FonoJex Pro');
    a.target = '_blank'; a.rel = 'noopener';
  });
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  vids.forEach(function (v) {
    v.addEventListener('play', function () {
      v.preload = 'auto';
      vids.forEach(function (o) { if (o !== v && !o.paused) o.pause(); });
      v.closest('.vcard').classList.add('playing');
    });
    v.addEventListener('pause', function () { v.closest('.vcard').classList.remove('playing'); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.intersectionRatio < 0.1 && !v.paused) v.pause(); }); }, { threshold: [0, 0.1] }).observe(v);
    }
  });
})();
