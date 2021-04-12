import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

/**
 * Returns the online status of the browser.
 *
 * @returns {Boolean} Online status of the browser
 */
export default function useOnLine() {
  const [onLine, setOnLine] = useState(window.navigator.onLine);

  const handleOnline = useCallback(() => {
    setOnLine(true);
  }, []);

  const handleOffline = useCallback(() => {
    setOnLine(false);
  }, []);

  useEventListener(window, 'online', handleOnline);
  useEventListener(window, 'offline', handleOffline);

  return onLine;
}
