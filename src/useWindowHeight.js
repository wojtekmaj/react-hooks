import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isWindowDefined = typeof window !== 'undefined';

/**
 * Returns the interior height of the window in pixels.
 *
 * @returns {number} Height of the window in pixels
 */
export default function useWindowHeight() {
  const [windowHeight, setWindowHeight] = useState(isWindowDefined ? window.innerHeight : null);

  const getWindowHeight = useCallback(
    () => setWindowHeight(window.innerHeight),
    [],
  );

  useEventListener(isWindowDefined ? window : null, 'resize', getWindowHeight);

  return windowHeight;
}
