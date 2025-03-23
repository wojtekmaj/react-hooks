import { useCallback, useState } from 'react';
import useEventListener from './useEventListener.js';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Returns current scroll left position in pixels.
 *
 * @returns {number | null} Scroll left position in pixels
 */
export default function useScrollLeft(): number | null {
  const [scrollLeft, setScrollLeft] = useState(isBrowser ? window.scrollX : null);

  const getScrollLeft = useCallback(() => setScrollLeft(window.scrollX), []);

  useEventListener(isBrowser ? document : null, 'scroll', getScrollLeft);

  return scrollLeft;
}
