import { useState } from 'react';

/**
 * Returns a flag and a function to toggle it.
 *
 * @param {boolean} defaultValue Default value
 */
export default function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);
  const toggleValue = () => setValue((prevValue) => !prevValue);
  return [value, toggleValue];
}
