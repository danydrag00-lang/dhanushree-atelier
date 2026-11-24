/* Dhanushree Timbers cinematic video.
   Muted inline playback, visible pause control, tab/offscreen pausing and a static fallback. */
(() => {
  'use strict';
  const video = document.querySelector('[data-hero-video]');
  if (!video) return;
  const hero = video.closest('[data-cinema-hero]');
  const button = hero?.querySelector('[data-film-toggle]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = Boolean(navigator.connection?.saveData);
  let inView = true;
  let manuallyPaused = false;
  let failed = false;

  video.muted = true;
  video.defaultMuted = true;

  const updateButton = () => {
    if (!button) return;
    const paused = video.paused;
    button.textContent = paused ? '▶' : 'Ⅱ';
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    button.title = paused ? 'Play background video' : 'Pause background video';
  };

  const fallback = () => {
    failed = true;
    video.pause();
    video.classList.remove('is-ready');
    hero?.classList.add('hero-film-fallback');
    updateButton();
  };

  const manage = () => {
    if (failed) return;
    if (reduce.matches || saveData || document.hidden || !inView || manuallyPaused) {
      video.pause();
      if (reduce.matches || saveData) video.classList.remove('is-ready');
      updateButton();
      return;
    }
    video.classList.add('is-ready');
    const result = video.play();
    if (result?.catch) result.catch(() => {
      video.pause();
      video.classList.remove('is-ready');
      updateButton();
    });
    updateButton();
  };

  video.addEventListener('loadeddata', manage);
  video.addEventListener('playing', () => {
    if (!reduce.matches && !saveData) video.classList.add('is-ready');
    updateButton();
  });
  video.addEventListener('pause', updateButton);
  video.addEventListener('error', fallback);
  button?.addEventListener('click', () => {
    manuallyPaused = !video.paused ? true : false;
    manage();
  });
  if ('IntersectionObserver' in window && hero) {
    const io = new IntersectionObserver(entries => {
      inView = Boolean(entries[0]?.isIntersecting);
      manage();
    }, {threshold:0.01});
    io.observe(hero);
  }
  document.addEventListener('visibilitychange', manage, {passive:true});
  reduce.addEventListener?.('change', manage);
  if (reduce.matches || saveData) { video.pause(); updateButton(); }
  else if (video.readyState >= 2) manage();
  else updateButton();
})();
