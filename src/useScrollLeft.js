import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isWindowDefined = typeof window !== 'undefined';

/**
 * Returns current scroll left position in pixels.
 *
 * @returns {number} Scroll left position in pixels
 */
export default function useScrollLeft() {
  const [scrollLeft, setScrollLeft] = useState(isWindowDefined ? window.pageXOffset : null);

  const getScrollLeft = useCallback(
    () => setScrollLeft(window.pageXOffset),
    [],
  );

  useEventListener(isWindowDefined ? document : null, 'scroll', getScrollLeft);

  return scrollLeft;
}
