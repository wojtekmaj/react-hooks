import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isBrowser = typeof document !== 'undefined';

/**
 * Returns current scroll top position in pixels.
 *
 * @returns {number | null} Scroll top position in pixels
 */
export default function useScrollTop(): number | null {
  const [scrollTop, setScrollTop] = useState(isBrowser ? window.pageYOffset : null);

  const getScrollTop = useCallback(() => setScrollTop(window.pageYOffset), []);

  useEventListener(isBrowser ? document : null, 'scroll', getScrollTop);

  return scrollTop;
}
