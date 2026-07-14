import { useCallback, useState } from 'react';

import useEventListener from './useEventListener.js';

const isBrowser = typeof document !== 'undefined';

/**
 * Returns the document's current visibility state.
 *
 * @returns {DocumentVisibilityState | null} Visibility state of the document
 */
export default function useDocumentVisibility(): DocumentVisibilityState | null {
  const [visibilityState, setVisibilityState] = useState<DocumentVisibilityState | null>(
    isBrowser ? document.visibilityState : null,
  );

  const handleVisibilityChange = useCallback(() => {
    setVisibilityState(document.visibilityState);
  }, []);

  useEventListener(isBrowser ? document : null, 'visibilitychange', handleVisibilityChange);

  return visibilityState;
}
