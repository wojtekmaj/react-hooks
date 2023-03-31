import { useEffect } from 'react';

/**
 * Runs a given function every n milliseconds.
 *
 * @param {Function} fn Function to run. WARNING! If you define the function in component body,
 *   make sure to memoize it.
 * @param {number} delay Interval between function runs (in ms)
 * @returns {void}
 */
export default function useSetInterval(fn: () => void, delay: number): void {
  useEffect(() => {
    const interval = setInterval(fn, delay);

    return () => clearInterval(interval);
  }, [fn, delay]);
}
