import { fetchWithTimeout } from '../utils/httpUtils';

const EVENT_API_URL = import.meta.env.VITE_EVENT_API_URL || 'https://api.mocki.io/v2/01d0a1b0-2f3b-4c4d-9e0a-1b0c2d3e4f5a';
const AUTHORS_API_URL =   import.meta.env.VITE_AUTHORS_API_URL || 'https://jsonplaceholder.typicode.com/users';

const FALLBACK_EVENT = {
  eventName: 'Literary Nexus Gala',
  eventDate: '2026-12-31T19:00:00Z',
  location: 'Portland Grand Ballroom'
};

/**
 * Fetch event details for the hero headline + countdown.
 */
export async function fetchEventData() {
  try {
    const response = await fetchWithTimeout(EVENT_API_URL, {}, 6000);
    if (!response.ok) {
      throw new Error(`Event API responded with status ${response.status}`);
    }
    const data = await response.json();
    if (!data.eventDate) {
      throw new Error('Event API response is missing eventDate');
    }
    return data;
  } catch (error) {
    const reason = error.isTimeout ? 'request timed out' : error.message;
    console.warn('[api] Using fallback event data:', reason);
    return FALLBACK_EVENT;
  }
}

/**
 * Fetch author/speaker profiles for the "Featured Literary Personalities" grid.
 */
export async function fetchAuthors() {
  try {
    const response = await fetchWithTimeout(AUTHORS_API_URL, {}, 6000);
    if (!response.ok) {
      throw new Error(`Authors API responded with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    const reason = error.isTimeout ? 'request timed out' : error.message;
    console.warn('[api] Live authors API failed, trying local fallback:', reason);
    return fetchLocalAuthorsFallback();
  }
}

/**
 * Local fallback for author data, served from assets/data/authors.json.
 * Keeps the page from showing an empty grid if jsonplaceholder is down,
 */
async function fetchLocalAuthorsFallback() {
  try {
    const response = await fetchWithTimeout('./assets/data/authors.json', {}, 4000);
    if (!response.ok) {
      throw new Error(`Local fallback responded with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('[api] Local authors fallback also failed:', error.message);
    return [];
  }
}