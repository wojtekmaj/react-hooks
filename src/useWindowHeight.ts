import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);

  return () => {
    window.removeEventListener('resize', callback);
  };
}

function getSnapshot() {
  return window.innerHeight;
}

function getServerSnapshot() {
  return null;
}

/**
 * Returns the interior height of the window in pixels.
 *
 * @returns {number | null} Height of the window in pixels
 */
export default function useWindowHeight(): number | null {
  const windowHeight = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return windowHeight;
}
