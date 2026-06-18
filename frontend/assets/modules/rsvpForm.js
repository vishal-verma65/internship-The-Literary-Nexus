import { fetchWithTimeout } from '../utils/httpUtils';

const SUBMIT_ENDPOINT = import.meta.env.VITE_SUBMIT_ENDPOINT || 'https://httpbin.org/post';
const SUBMIT_TIMEOUT_MS = 8000;

export function initRsvpForm() {
  const form = document.getElementById('rsvp-form');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (event) => handleSubmit(event, form, feedback));
}

async function handleSubmit(event, form, feedback) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    setFeedback(feedback, 'Please fill in all required fields correctly.', 'error');
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  toggleSubmitting(submitButton, true);

  const formData = new FormData(form);

  try {
    await fetchWithTimeout(SUBMIT_ENDPOINT, { method: 'POST', body: formData }, SUBMIT_TIMEOUT_MS);
    // console.info('[rsvpForm] Submitted payload:', Object.fromEntries(formData.entries()));
    setFeedback(feedback, 'RSVP confirmed! We look forward to seeing you.', 'success');
    form.reset();
  } catch (error) {
    const message = error.isTimeout
      ? 'The RSVP server is taking too long to respond. Please try again shortly.'
      : 'Something went wrong sending your RSVP. Please try again.';
    // console.error('[rsvpForm] Submission failed:', error.message);
    setFeedback(feedback, message, 'error');
  } finally {
    toggleSubmitting(submitButton, false);
  }
}

function setFeedback(feedbackEl, message, type) {
  if (!feedbackEl) return;
  feedbackEl.textContent = message;
  feedbackEl.classList.remove('form__feedback--success', 'form__feedback--error');
  feedbackEl.classList.add(`form__feedback--${type}`);
}

function toggleSubmitting(button, isSubmitting) {
  if (!button) return;
  button.disabled = isSubmitting;
  button.textContent = isSubmitting ? 'Sending…' : 'Confirm Your Attendance';
}