import { useCallback, useRef, useState } from 'react';

import useEventListener from './useEventListener.js';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

type Direction = 'still' | 'up' | 'down';

/**
 * Returns current scroll top direction.
 *
 * @returns {Direction | null} Scroll top direction
 */
export default function useScrollTopDirection(): Direction | null {
  const prevScrollTop = useRef<number | null>(null);
  const [direction, setDirection] = useState<Direction | null>(isBrowser ? 'still' : null);

  const onScroll = useCallback(() => {
    const { scrollY } = window;

    if (prevScrollTop.current !== null) {
      setDirection(prevScrollTop.current < scrollY ? 'down' : 'up');
    }

    prevScrollTop.current = scrollY;
  }, []);

  useEventListener(isBrowser ? document : null, 'scroll', onScroll);

  return direction;
}
