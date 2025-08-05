import { useCallback, useState } from 'react';

import useEventListener from './useEventListener.js';

const isBrowser = typeof window !== 'undefined';

/**
 * Returns a stateful value synchronized with sessionStorage, and a function to update it.
 *
 * @param {string} key sessionStorage key
 * @param {*} initialState Initial state
 */
export default function useSessionStorage<T = unknown>(
  key: string,
  initialState?: T | (() => T),
): [T, (nextValueOrFunction: T | ((value: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    function getInitialState() {
      return initialState instanceof Function ? initialState() : initialState;
    }

    if (!isBrowser) {
      return getInitialState();
    }

    const rawValue = sessionStorage.getItem(key);

    try {
      return rawValue !== null ? JSON.parse(rawValue) : getInitialState();
    } catch {
      return getInitialState();
    }
  });

  const onChange = useCallback(
    (nextValueOrFunction: T | ((value: T) => T)) => {
      const nextValue =
        nextValueOrFunction instanceof Function ? nextValueOrFunction(value) : nextValueOrFunction;

      if (isBrowser) {
        sessionStorage.setItem(key, JSON.stringify(nextValue));
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
