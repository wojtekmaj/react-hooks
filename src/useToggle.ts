import { useState } from 'react';

/**
 * Returns a flag and a function to toggle it.
 *
 * @param {boolean} defaultValue Default value
 * @returns {[boolean, () => void]} Flag and toggle function
 */
export default function useToggle(defaultValue = false): [boolean, () => void] {
  const [value, setValue] = useState(defaultValue);
  const toggleValue = () => setValue((prevValue) => !prevValue);
  return [value, toggleValue];
}
