import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isBrowser = typeof document !== 'undefined';

/**
 * Returns the online status of the browser.
 *
 * @returns {boolean | null} Online status of the browser
 */
export default function useOnLine(): boolean | null {
  const [onLine, setOnLine] = useState(isBrowser ? navigator.onLine : null);

  const handleOnline = useCallback(() => {
    setOnLine(true);
  }, []);

  const handleOffline = useCallback(() => {
    setOnLine(false);
  }, []);

  useEventListener(isBrowser ? window : null, 'online', handleOnline);
  useEventListener(isBrowser ? window : null, 'offline', handleOffline);

  return onLine;
}
