import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isWindowDefined = typeof window !== 'undefined';

/**
 * Returns the interior width of the window in pixels.
 *
 * @returns {number} Width of the window in pixels
 */
export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(isWindowDefined ? window.innerWidth : null);

  const getWindowWidth = useCallback(
    () => setWindowWidth(window.innerWidth),
    [],
  );

  useEventListener(isWindowDefined ? window : null, 'resize', getWindowWidth);

  return windowWidth;
}
