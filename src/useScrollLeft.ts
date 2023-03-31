import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isBrowser = typeof document !== 'undefined';

/**
 * Returns current scroll left position in pixels.
 *
 * @returns {number | null} Scroll left position in pixels
 */
export default function useScrollLeft(): number | null {
  const [scrollLeft, setScrollLeft] = useState(isBrowser ? window.pageXOffset : null);

  const getScrollLeft = useCallback(() => setScrollLeft(window.pageXOffset), []);

  useEventListener(isBrowser ? document : null, 'scroll', getScrollLeft);

  return scrollLeft;
}
