export function initBioToggle() {
  const grid = document.getElementById('authors-grid');
  if (!grid) return;

  grid.addEventListener('click', (event) => {
    const toggleBtn = event.target.closest('.author-card__toggle');
    if (!toggleBtn) return;

    const card = toggleBtn.closest('.author-card');
    const fullBio = card?.querySelector('.author-card__full-bio');
    if (!fullBio) return;

    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

    fullBio.hidden = isExpanded;
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    toggleBtn.textContent = isExpanded ? 'View Full Profile' : 'Hide Profile';
  });
}