import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const isBrowser = typeof document !== 'undefined';

/**
 * Returns a stateful value synchronized with localStorage, and a function to update it.
 *
 * @param {string} key localStorage key
 * @param {*} initialState Initial state
 */
export default function useLocalStorage<T = unknown>(
  key: string,
  initialState?: T | (() => T),
): [T, (nextValueOrFunction: T | ((value: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    if (!isBrowser) {
      return initialState;
    }

    const rawValue = localStorage.getItem(key);

    return rawValue !== null ? JSON.parse(rawValue) : initialState;
  });

  const onChange = useCallback(
    (nextValueOrFunction: T | ((value: T) => T)) => {
      const nextValue =
        nextValueOrFunction instanceof Function ? nextValueOrFunction(value) : nextValueOrFunction;

      if (isBrowser) {
        localStorage.setItem(key, JSON.stringify(nextValue));
      }

      setValue(nextValue);
    },
    [key, value],
  );

  const onStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }

      const { newValue: rawValue } = event;

      const nextValue = rawValue !== null ? JSON.parse(rawValue) : null;

      if (nextValue !== value) {
        setValue(nextValue);
      }
    },
    [key, value],
  );

  useEventListener(isBrowser ? window : null, 'storage', onStorage);

  return [value, onChange];
}
