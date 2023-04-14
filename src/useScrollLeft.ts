import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('scroll', callback);

  return () => {
    window.removeEventListener('scroll', callback);
  };
}

function getSnapshot() {
  return window.pageXOffset;
}

function getServerSnapshot() {
  return null;
}

/**
 * Returns current scroll left position in pixels.
 *
 * @returns {number | null} Scroll left position in pixels
 */
export default function useScrollLeft(): number | null {
  const scrollLeft = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return scrollLeft;
}
