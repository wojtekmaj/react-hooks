import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getWindowWidth = useCallback(
    () => setWindowWidth(window.innerWidth),
    [],
  );

  useEventListener(window, 'resize', getWindowWidth);

  return windowWidth;
}
