import { useCallback, useEffect, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

/**
 * Returns a flag which determines if the document matches the given media query string.
 *
 * @param {string} query Media query string
 * @returns {boolean | null} Whether the document matches the given media query string
 */
export default function useMatchMedia(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(() =>
    isBrowser ? window.matchMedia(query).matches : null,
  );
  const handleMql = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    if (isBrowser) {
      const mql = window.matchMedia(query);
      setMatches(mql.matches);

      if (mql.addEventListener) {
        mql.addEventListener('change', handleMql);
        return () => {
          mql.removeEventListener('change', handleMql);
        };
      } else {
        mql.addListener(handleMql);
        return () => {
          mql.removeListener(handleMql);
        };
      }
    }
  }, [query, handleMql]);

  return matches;
}
