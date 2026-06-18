import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAuthorCardsAnimation() {
  const authorsSection = document.getElementById('authors');
  const heading = document.getElementById('authors-heading');
  const cards = document.querySelectorAll('#authors-grid .author-card');

  if (!authorsSection || !cards.length) return;

  const elsToReset = heading ? [heading, ...cards] : [...cards];
  gsap.set(elsToReset, { transition: 'none' });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: authorsSection,
      start: 'top 60%',
      toggleActions: 'play none none none',
      once: true, 
    },
  });

  if (heading) {
    tl.from(heading, {
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: 'back.out(1.5)', 
      clearProps: 'transition',
    }, 0);
  }

  tl.from(cards, {
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: 'back.out(1.5)',
    stagger: 0.15, 
    clearProps: 'transition',
  }, heading ? 0.2 : 0); 
}

export function initRsvpAnimation() {
  const rsvpSection = document.getElementById('rsvp');
  const formWrap = document.querySelector('.rsvp__form-wrap');
  const venue = document.querySelector('.rsvp__venue');

  if (!rsvpSection || !formWrap || !venue) return;

  gsap.set([formWrap, venue], { transition: 'none' });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: rsvpSection,
      start: 'top 70%',
      toggleActions: 'play none none none',
      once: true,
    },
  });

  tl.from(formWrap, {
    duration: 0.9,
    x: -100,
    opacity: 0,
    ease: 'back.out(1.5)',
    clearProps: 'transition',
  }, 0);
  tl.from(venue, {
    duration: 0.9,
    x: 100,
    opacity: 0,
    ease: 'back.out(1.5)',
    clearProps: 'transition',
  }, 0.15);
}

export function initScheduleAnimation() {
  const scheduleSection = document.getElementById('schedule');
  const heading = document.getElementById('schedule-heading');
  const items = document.querySelectorAll('.schedule__list .schedule__item');

  if (!scheduleSection || !items.length) return;

  gsap.set(items, { transition: 'none' });

  gsap.from(heading, {
    scrollTrigger: {
      trigger: scheduleSection,
      start: 'top 60%',
      once: true,
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: 'back.out(1.5)',
  });

  gsap.from(items, {
    scrollTrigger: {
      trigger: scheduleSection,
      start: 'top 55%',
      toggleActions: 'play none none none',
      once: true,
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: 'back.out(1.5)',
    stagger: 0.15,
    clearProps: 'transition',
  });
}