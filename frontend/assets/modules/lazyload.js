export function initLazyLoad() {
  const upgradeTargets = document.querySelectorAll('[data-remote-src]');
  if (upgradeTargets.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    upgradeTargets.forEach(upgradeImage);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          upgradeImage(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '100px 0px' }
  );

  upgradeTargets.forEach((el) => observer.observe(el));
}

function upgradeImage(el) {
  const remoteSrc = el.getAttribute('data-remote-src');
  if (!remoteSrc) return;

  const probe = new Image();

  probe.onload = () => {
    el.src = remoteSrc;
  };

  probe.onerror = () => {
    console.warn('[lazyLoad] Remote upgrade failed, keeping local image:', remoteSrc);
  };

  probe.src = remoteSrc;
}