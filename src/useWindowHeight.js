import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

export default function useWindowHeight() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const getWindowHeight = useCallback(
    () => setWindowHeight(window.innerHeight),
    [],
  );

  useEventListener(window, 'resize', getWindowHeight);

  return windowHeight;
}
