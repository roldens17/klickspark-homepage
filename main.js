/* KlickSpark Studio — shared JS (no dependencies) */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Mobile nav toggle --- */
  var toggle = document.querySelector('.nav-toggle');
  var header = document.querySelector('.site-header');
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    header.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* --- Scroll reveal --- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* --- Gallery lightbox (progressive enhancement: links work without JS) --- */
  var dialog = document.querySelector('.lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    var img = dialog.querySelector('img');
    var cap = dialog.querySelector('.lightbox__caption');
    var lastTrigger = null;

    document.querySelectorAll('[data-lightbox]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var thumb = link.querySelector('img');
        lastTrigger = link;
        img.src = link.getAttribute('href');
        img.alt = thumb ? thumb.alt : '';
        cap.textContent = link.getAttribute('data-caption') || '';
        dialog.showModal();
      });
    });

    dialog.querySelector('.lightbox__close').addEventListener('click', function () {
      dialog.close();
    });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', function () {
      img.removeAttribute('src');
      if (lastTrigger) lastTrigger.focus();
    });
  }
})();
