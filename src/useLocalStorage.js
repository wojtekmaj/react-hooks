import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isWindowDefined = typeof window !== 'undefined';

/**
 * Returns a stateful value synchronized with localStorage, and a function to update it.
 *
 * @param {string} key localStorage key
 * @param {*} initialState Initial state
 */
export default function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(() => {
    if (!isWindowDefined) {
      return initialState;
    }

    const rawValue = localStorage.getItem(key);

    return rawValue !== undefined && rawValue !== null
      ? JSON.parse(localStorage.getItem(key))
      : initialState;
  });

  const onChange = useCallback(
    (nextValueOrFunction) => {
      const nextValue =
        nextValueOrFunction instanceof Function ? nextValueOrFunction(value) : nextValueOrFunction;
      if (isWindowDefined) {
        localStorage.setItem(key, JSON.stringify(nextValue));
      }
      setValue(nextValue);
    },
    [key, value],
  );

  const onStorage = useCallback(() => {
    const nextValue = JSON.parse(localStorage.getItem(key));

    if (nextValue !== value) {
      setValue(nextValue);
    }
  }, [key, value]);

  useEventListener(isWindowDefined ? window : null, 'storage', onStorage);

  return [value, onChange];
}
