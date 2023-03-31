import { useEffect } from 'react';

/**
 * Runs a given function after n milliseconds.
 *
 * @param {Function} fn Function to run. WARNING! If you define the function in component body,
 *   make sure to memoize it.
 * @param {number} delay Delay to function run (in ms)
 * @returns {void}
 */
export default function useSetTimeout(fn: () => void, delay: number): void {
  useEffect(() => {
    const timeout = setTimeout(fn, delay);

    return () => clearTimeout(timeout);
  }, [fn, delay]);
}
