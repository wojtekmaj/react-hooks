import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

/**
 * Returns current scroll top position in pixels.
 *
 * @returns {number} Scroll top position in pixels
 */
export default function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(window.pageYOffset);

  const getScrollTop = useCallback(
    () => setScrollTop(window.pageYOffset),
    [],
  );

  useEventListener(document, 'scroll', getScrollTop);

  return scrollTop;
}
