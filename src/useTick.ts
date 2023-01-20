import { useCallback, useState } from 'react';
import useSetInterval from './useSetInterval';

/**
 * Counts from 0, increasing the number returned every n milliseconds.
 *
 * @param {number} delay Interval between ticks (in ms)
 * @returns {number} Tick
 */
export default function useTick(delay = 1000): number {
  const [tick, setTick] = useState(0);

  const doTick = useCallback(() => {
    setTick((prevTick) => prevTick + 1);
  }, []);

  useSetInterval(doTick, delay);

  return tick;
}
