import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return null;
}

/**
 * Returns the online status of the browser.
 *
 * @returns {boolean | null} Online status of the browser
 */
export default function useOnLine(): boolean | null {
  const onLine = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return onLine;
}
