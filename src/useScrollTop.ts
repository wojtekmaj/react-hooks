import { useCallback, useState } from 'react';
import useEventListener from './useEventListener.js';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Returns current scroll top position in pixels.
 *
 * @returns {number | null} Scroll top position in pixels
 */
export default function useScrollTop(): number | null {
  const [scrollTop, setScrollTop] = useState(isBrowser ? window.scrollY : null);

  const getScrollTop = useCallback(() => setScrollTop(window.scrollY), []);

  useEventListener(isBrowser ? document : null, 'scroll', getScrollTop);

  return scrollTop;
}
