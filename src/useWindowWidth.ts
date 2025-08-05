import { useCallback, useState } from 'react';

import useEventListener from './useEventListener.js';

const isBrowser = typeof window !== 'undefined';

/**
 * Returns the interior width of the window in pixels.
 *
 * @returns {number | null} Width of the window in pixels
 */
export default function useWindowWidth(): number | null {
  const [windowWidth, setWindowWidth] = useState(isBrowser ? window.innerWidth : null);

  const getWindowWidth = useCallback(() => setWindowWidth(window.innerWidth), []);

  useEventListener(isBrowser ? window : null, 'resize', getWindowWidth);

  return windowWidth;
}
