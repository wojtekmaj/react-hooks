import { useCallback, useState } from 'react';

import useEventListener from './useEventListener.js';

const isBrowser = typeof window !== 'undefined';

function getWindowSize(): { width: number; height: number } {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Returns the interior width and height of the window in pixels.
 *
 * @returns {{ width: number; height: number } | null} Width and height of the window in pixels
 */
export default function useWindowSize(): { width: number; height: number } | null {
  const [windowSize, setWindowSize] = useState(isBrowser ? getWindowSize() : null);

  const updateWindowSize = useCallback(() => setWindowSize(getWindowSize()), []);

  useEventListener(isBrowser ? window : null, 'resize', updateWindowSize);

  return windowSize;
}
