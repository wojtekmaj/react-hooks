import { useState } from 'react';

import useDebouncedValue from './useDebouncedValue.js';

/**
 * Returns a debounced state and a function to update it.
 *
 * @template T
 * @param {T} initialValue The initial value of the state
 * @param {number} [debounceTime=250] The delay to wait before updating the state
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} The debounced state and a function to update it
 */
export default function useDebouncedState<T>(
  initialValue: T,
  debounceTime = 250,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(initialValue);

  const debouncedValue = useDebouncedValue(value, debounceTime);

  return [debouncedValue, setValue];
}
