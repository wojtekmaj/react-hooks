import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

/**
 * Returns a flag which determines if the document matches the given media query string.
 *
 * @param {string} query Media query string
 * @returns {boolean} Whether the document matches the given media query string
 */
export default function useMatchMedia(query) {
  const mql = useMemo(() => window.matchMedia(query), [query]);
  const [matches, setMatches] = useState(mql.matches);

  const handleMql = useCallback((event) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    mql.addListener(handleMql);

    return () => {
      mql.removeListener(handleMql);
    };
  }, [mql, handleMql]);

  return matches;
}
