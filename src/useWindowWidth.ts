import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);

  return () => {
    window.removeEventListener('resize', callback);
  };
}

function getSnapshot() {
  return window.innerWidth;
}

function getServerSnapshot() {
  return null;
}

/**
 * Returns the interior width of the window in pixels.
 *
 * @returns {number | null} Width of the window in pixels
 */
export default function useWindowWidth(): number | null {
  const windowWidth = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return windowWidth;
}
