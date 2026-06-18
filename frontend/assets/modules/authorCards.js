import { fetchAuthors } from './api.js';

export async function renderAuthorCards() {
  const grid = document.getElementById('authors-grid');
  const template = document.getElementById('author-card-template');
  const statusEl = document.getElementById('authors-status');

  if (!grid || !template) return;

  if (statusEl) statusEl.textContent = 'Loading featured authors…';

  const authors = await fetchAuthors();

  if (authors.length === 0) {
    if (statusEl) {
      statusEl.textContent = 'Author profiles are temporarily unavailable. Please check back shortly.';
    }
    return;
  }

  if (statusEl) statusEl.textContent = '';

  authors.forEach((author) => {
    grid.appendChild(buildCard(author, template));
  });
}

function buildCard(author, template) {
  const card = template.content.cloneNode(true);

  const photo = card.querySelector('.author-card__photo');
  const name = card.querySelector('.author-card__name');
  const bio = card.querySelector('.author-card__bio');
  const fullBio = card.querySelector('.author-card__full-bio');

  photo.src = `https://picsum.photos/id/${author.id}/200/200`;
  photo.alt = `Portrait of ${author.name}`;
  photo.addEventListener('error', () => handlePhotoError(photo, author.name));

  name.textContent = author.name;
  bio.textContent = author.company?.catchPhrase || 'A distinguished voice in contemporary literature.';

  const bioPara = document.createElement('p');
  bioPara.textContent = author.company?.bs || 'Full biography coming soon.';
  fullBio.appendChild(bioPara);

  if (author.email) {
    fullBio.appendChild(buildEmailLine(author.email));
  }

  return card;
}

function buildEmailLine(email) {
  const emailPara = document.createElement('p');
  emailPara.className = 'author-card__email';
  emailPara.append('Contact: ');

  const emailLink = document.createElement('a');
  emailLink.href = `mailto:${email}`;
  emailLink.textContent = email;

  emailPara.appendChild(emailLink);
  return emailPara;
}

function handlePhotoError(photo, authorName) {
  if (photo.dataset.fallbackApplied === 'true') {
    photo.style.display = 'none';
    return;
  }

  photo.dataset.fallbackApplied = 'true';
  photo.src = 'assets/images/author.webp';
  photo.alt = `Photo unavailable for ${authorName}`;
}