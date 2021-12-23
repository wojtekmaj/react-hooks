import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isWindowDefined = typeof window !== 'undefined';

/**
 * Returns the online status of the browser.
 *
 * @returns {Boolean} Online status of the browser
 */
export default function useOnLine() {
  const [onLine, setOnLine] = useState(isWindowDefined ? navigator.onLine : null);

  const handleOnline = useCallback(() => {
    setOnLine(true);
  }, []);

  const handleOffline = useCallback(() => {
    setOnLine(false);
  }, []);

  useEventListener(isWindowDefined ? window : null, 'online', handleOnline);
  useEventListener(isWindowDefined ? window : null, 'offline', handleOffline);

  return onLine;
}
