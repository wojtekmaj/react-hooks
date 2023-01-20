import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isBrowser = typeof document !== 'undefined';

/**
 * Returns the interior width of the window in pixels.
 *
 * @returns {number} Width of the window in pixels
 */
export default function useWindowWidth(): number | null {
  const [windowWidth, setWindowWidth] = useState<number | null>(
    isBrowser ? window.innerWidth : null,
  );

  const getWindowWidth = useCallback(() => setWindowWidth(window.innerWidth), []);

  useEventListener(isBrowser ? window : null, 'resize', getWindowWidth);

  return windowWidth;
}
