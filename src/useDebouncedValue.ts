import { useState } from 'react';

import useSetTimeout from './useSetTimeout.js';

/**
 * Returns a debounced value.
 *
 * @template T
 * @param {T} value The value to debounce
 * @param {number} [debounceTime=250] The delay to wait before updating the value
 * @returns {T} The debounced value
 */
export default function useDebouncedValue<T>(value: T, debounceTime = 250): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useSetTimeout(() => {
    setDebouncedValue(value);
  }, debounceTime);

  return debouncedValue;
}
