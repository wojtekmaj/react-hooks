import { useCallback, useSyncExternalStore } from 'react';

function getServerSnapshot() {
  return null;
}

/**
 * Returns a flag which determines if the document matches the given media query string.
 *
 * @param {string} query Media query string
 * @returns {boolean | null} Whether the document matches the given media query string
 */
export default function useMatchMedia(query: string): boolean | null {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);

      mql.addEventListener('change', callback);
      return () => {
        mql.removeEventListener('change', callback);
      };
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    const mql = window.matchMedia(query);

    return mql.matches;
  }, [query]);

  const matches = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return matches;
}
