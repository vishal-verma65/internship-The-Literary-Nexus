const REMOTE_HERO_URL = import.meta.env.VITE_REMOTE_HERO_URL || 'https://picsum.photos/id/1015/1600/900';
const BACKGROUND_TARGET_SELECTORS = ['#hero'];

export function initHeroBackground() {
  const preloadImg = new Image();

  preloadImg.onload = () => {
    BACKGROUND_TARGET_SELECTORS.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) el.style.backgroundImage = `url('${REMOTE_HERO_URL}')`;
    });
  };

  preloadImg.onerror = () => {
    console.warn('[heroBackground] Remote hero image unavailable, keeping local fallback (heroBg.webp).');
  };

  preloadImg.src = REMOTE_HERO_URL;
}