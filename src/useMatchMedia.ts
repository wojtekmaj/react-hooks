import { useCallback, useEffect, useMemo, useState } from 'react';

const isBrowser = typeof document !== 'undefined';

/**
 * Returns a flag which determines if the document matches the given media query string.
 *
 * @param {string} query Media query string
 * @returns {boolean | null} Whether the document matches the given media query string
 */
export default function useMatchMedia(query: string): boolean | null {
  const mql = useMemo(() => (isBrowser ? window.matchMedia(query) : null), [query]);
  const [matches, setMatches] = useState(mql ? mql.matches : null);

  const handleMql = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    if (!mql) {
      return undefined;
    }

    mql.addEventListener('change', handleMql);

    return () => {
      mql.removeEventListener('change', handleMql);
    };
  }, [mql, handleMql]);

  return matches;
}
