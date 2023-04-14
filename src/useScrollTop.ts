import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('scroll', callback);

  return () => {
    window.removeEventListener('scroll', callback);
  };
}

function getSnapshot() {
  return window.pageYOffset;
}

function getServerSnapshot() {
  return null;
}

/**
 * Returns current scroll top position in pixels.
 *
 * @returns {number | null} Scroll top position in pixels
 */
export default function useScrollTop(): number | null {
  const scrollTop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return scrollTop;
}
