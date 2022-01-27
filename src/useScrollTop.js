import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isWindowDefined = typeof window !== 'undefined';

/**
 * Returns current scroll top position in pixels.
 *
 * @returns {number} Scroll top position in pixels
 */
export default function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(isWindowDefined ? window.pageYOffset : null);

  const getScrollTop = useCallback(() => setScrollTop(window.pageYOffset), []);

  useEventListener(isWindowDefined ? document : null, 'scroll', getScrollTop);

  return scrollTop;
}
