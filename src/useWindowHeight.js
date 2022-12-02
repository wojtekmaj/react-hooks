import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isBrowser = typeof document !== 'undefined';

/**
 * Returns the interior height of the window in pixels.
 *
 * @returns {number} Height of the window in pixels
 */
export default function useWindowHeight() {
  const [windowHeight, setWindowHeight] = useState(isBrowser ? window.innerHeight : null);

  const getWindowHeight = useCallback(() => setWindowHeight(window.innerHeight), []);

  useEventListener(isBrowser ? window : null, 'resize', getWindowHeight);

  return windowHeight;
}
