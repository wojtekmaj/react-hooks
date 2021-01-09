import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

/**
 * Returns the interior height of the window in pixels.
 *
 * @returns {number} Height of the window in pixels
 */
export default function useWindowHeight() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const getWindowHeight = useCallback(
    () => setWindowHeight(window.innerHeight),
    [],
  );

  useEventListener(window, 'resize', getWindowHeight);

  return windowHeight;
}
