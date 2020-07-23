import { useState } from 'react';

/**
 * Returns a flag and a function to toggle it.
 *
 * @param {Boolean} defaultValue Default value
 */
export default function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);
  const toggleValue = () => setValue(!value);
  return [value, toggleValue];
}
