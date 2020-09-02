import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

/**
 * Returns current scroll left position in pixels.
 *
 * @returns {number} Scroll left position in pixels
 */
export default function useScrollLeft() {
  const [scrollLeft, setScrollLeft] = useState(window.pageXOffset);

  const getScrollLeft = useCallback(
    () => setScrollLeft(window.pageXOffset),
    [],
  );

  useEventListener(document, 'scroll', getScrollLeft);

  return scrollLeft;
}
