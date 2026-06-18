import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initErrorLogger } from './modules/errorLogger.js';
import { initHeroBackground } from './modules/heroBackground.js';
import { initCountdown } from './modules/countdown.js';
import { initHeroScroll, initHeroAnimation } from './modules/heroScroll.js';
import { renderAuthorCards } from './modules/authorCards.js';
import {
  initAuthorCardsAnimation,
  initScheduleAnimation,
  initRsvpAnimation,
} from './animations/animations.js';
import { initBioToggle } from './modules/bioModal.js';
import { initRsvpForm } from './modules/rsvpForm.js';
import { initLazyLoad } from './modules/lazyload.js';

gsap.registerPlugin(ScrollTrigger);

function hideLoader() {
  const loader = document.getElementById('app-loader');

  if (!loader) return;

  loader.classList.add('hide');

  document.documentElement.classList.remove('loading');

  setTimeout(() => {
    loader.remove();
  }, 600);
}

function init() {
  initErrorLogger();

  initHeroBackground();
  initHeroAnimation();
  initHeroScroll();

  initCountdown();
  initRsvpForm();
  initLazyLoad();

  renderAuthorCards().then(() => {
    initBioToggle();

    initAuthorCardsAnimation();
    initScheduleAnimation();
    initRsvpAnimation();

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const heroImage = new Image();

  heroImage.src =
    import.meta.env.VITE_REMOTE_HERO_URL ||
    'https://picsum.photos/id/1015/1600/900';

  const startApplication = () => {
    init();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hideLoader();
      });
    });
  };

  if (heroImage.complete) {
    startApplication();
    return;
  }

  heroImage.onload = startApplication;

  heroImage.onerror = () => {
    console.warn(
      '[Loader] Hero image failed to load. Starting application anyway.'
    );

    startApplication();
  };
});