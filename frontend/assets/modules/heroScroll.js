import gsap from 'gsap';

export function initHeroScroll() {
  const ctaButton = document.getElementById('cta-button');
  const rsvpSection = document.getElementById('rsvp');

  if (!ctaButton || !rsvpSection) return;

  ctaButton.addEventListener('click', (event) => {
    event.preventDefault();
    rsvpSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

export function initHeroAnimation() {
  const heroContent = document.querySelector('.hero__content');
  const heroSubheadline = document.querySelector('.hero__subheadline');
  const heroHeadline = document.querySelector('.hero__headline');
  const countdown = document.getElementById('countdown');
  const ctaButton = document.querySelector('.hero #cta-button'); // More specific selector

  if (!heroContent) return;

  const tl = gsap.timeline();

  tl.from(heroSubheadline, {
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: 'back.out(1.5)',
  }, 0);

  tl.from(heroHeadline, {
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: 'back.out(1.5)',
  }, 0.15);

  tl.from(countdown, {
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: 'back.out(1.5)',
  }, 0.3);

  if (ctaButton) {
    tl.set(ctaButton, { transition: 'none' }, 0.45)
      .from(ctaButton, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'back.out(1.5)',
        clearProps: 'transition',
      }, 0.45);
  }
}