import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

/**
 * Returns a stateful value synchronized with localStorage, and a function to update it.
 *
 * @param {string} key localStorage key
 * @param {*} initialState Initial state
 */
export default function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(() => {
    const rawValue = window.localStorage.getItem(key);

    return (
      rawValue !== undefined && rawValue !== null
        ? JSON.parse(window.localStorage.getItem(key))
        : initialState
    );
  });

  const onChange = useCallback((nextValue) => {
    window.localStorage.setItem(key, JSON.stringify(nextValue));
    setValue(nextValue);
  }, [key]);

  const onStorage = useCallback(() => {
    const nextValue = JSON.parse(window.localStorage.getItem(key));

    if (nextValue !== value) {
      setValue(nextValue);
    }
  }, [key, value]);

  useEventListener(window, 'storage', onStorage);

  return [value, onChange];
}
