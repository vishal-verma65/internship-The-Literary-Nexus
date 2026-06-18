import { fetchEventData } from './api.js';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

let intervalId = null;

function renderTick(targetTime, els) {
  const remaining = targetTime - Date.now();

  if (remaining <= 0) {
    clearInterval(intervalId);
    els.days.textContent = '00';
    els.hours.textContent = '00';
    els.minutes.textContent = '00';
    if (els.label) els.label.textContent = 'The Event Has Commenced';
    return;
  }

  const days = Math.floor(remaining / DAY);
  const hours = Math.floor((remaining % DAY) / HOUR);
  const minutes = Math.floor((remaining % HOUR) / MINUTE);

  els.days.textContent = String(days).padStart(2, '0');
  els.hours.textContent = String(hours).padStart(2, '0');
  els.minutes.textContent = String(minutes).padStart(2, '0');
}

export async function initCountdown() {
  const els = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    label: document.querySelector('.countdown__label')
  };
  const authorNameEl = document.getElementById('author-name-placeholder');

  if (!els.days || !els.hours || !els.minutes) return;

  const event = await fetchEventData();
  const targetTime = new Date(event.eventDate).getTime();

  if (authorNameEl && event.eventName) {
    authorNameEl.textContent = event.eventName;
  }

  if (Number.isNaN(targetTime)) {
    console.error('[countdown] Invalid eventDate received, countdown disabled.');
    if (els.label) els.label.textContent = 'Event Date Coming Soon';
    return;
  }

  renderTick(targetTime, els);
  intervalId = setInterval(() => renderTick(targetTime, els), SECOND);
}