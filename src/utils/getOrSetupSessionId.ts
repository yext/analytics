import { ulid } from 'ulidx';

export const SESSION_ID_KEY = 'yext_analytics_session_id';

/**
 * Retrieves session id from session storage, or generates a new ULID to use as session id.
 * The new id is then stored in session storage. Returns null if the sessionStorage API is
 * unavailable (e.g. The function is running on the server for SSR).
 */
export function getOrSetupSessionId(): string | null {
  if (typeof(window) === 'undefined') {
    return null;
  }
  try {
    let sessionId = window.sessionStorage.getItem(SESSION_ID_KEY);
    if (!sessionId) {
      sessionId = ulid();
      window.sessionStorage.setItem(SESSION_ID_KEY, sessionId);
    }
    return sessionId;
  } catch (err) {
    console.warn('Unable to use browser sessionStorage for sessionId.\n', err);
    return null;
  }
}