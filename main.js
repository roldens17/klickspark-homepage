/* KlickSpark Media — Homepage JS */

(function () {
  'use strict';

  /* Mark JS available so CSS reveal states (.js [data-reveal]) activate */
  document.documentElement.classList.add('js');

  const reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Scroll-reveal --- */
  const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
