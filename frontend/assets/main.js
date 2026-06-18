import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initErrorLogger } from './modules/errorLogger.js';
import { initHeroBackground } from './modules/heroBackground.js';
import { initCountdown } from './modules/countdown.js';
import { initHeroScroll, initHeroAnimation } from './modules/heroScroll.js';
import { renderAuthorCards } from './modules/authorCards.js';
import { initAuthorCardsAnimation, initScheduleAnimation, initRsvpAnimation } from './animations/animations.js';
import { initBioToggle } from './modules/bioModal.js';
import { initRsvpForm } from './modules/rsvpForm.js';
import { initLazyLoad } from './modules/lazyLoad.js';

gsap.registerPlugin(ScrollTrigger);

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

    requestAnimationFrame(() => ScrollTrigger.refresh());
  });
}

document.addEventListener('DOMContentLoaded', init);