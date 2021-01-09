import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

/**
 * Returns the interior width of the window in pixels.
 *
 * @returns {number} Width of the window in pixels
 */
export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getWindowWidth = useCallback(
    () => setWindowWidth(window.innerWidth),
    [],
  );

  useEventListener(window, 'resize', getWindowWidth);

  return windowWidth;
}
