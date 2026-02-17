import { useCallback, useRef, useState } from 'react';

import useEventListener from './useEventListener.js';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

type Direction = 'still' | 'left' | 'right';

/**
 * Returns current scroll left direction.
 *
 * @returns {Direction | null} Scroll left direction
 */
export default function useScrollLeftDirection(): Direction | null {
  const prevScrollLeft = useRef<number | null>(null);
  const [direction, setDirection] = useState<Direction | null>(isBrowser ? 'still' : null);

  const onScroll = useCallback(() => {
    const { scrollX } = window;

    if (prevScrollLeft.current !== null) {
      setDirection(prevScrollLeft.current < scrollX ? 'right' : 'left');
    }

    prevScrollLeft.current = scrollX;
  }, []);

  useEventListener(isBrowser ? document : null, 'scroll', onScroll);

  return direction;
}
