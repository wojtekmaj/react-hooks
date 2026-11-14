import { useCallback, useRef, useState } from 'react';

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

  // Keep pending updates available before React renders
  const valueRef = useRef(value);

  const onChange = useCallback(
    (nextValueOrFunction: T | ((value: T) => T)) => {
      const nextValue =
        nextValueOrFunction instanceof Function
          ? nextValueOrFunction(valueRef.current)
          : nextValueOrFunction;

      if (isBrowser) {
        sessionStorage.setItem(key, JSON.stringify(nextValue));
      }

      valueRef.current = nextValue;
      setValue(nextValue);
    },
    [key],
  );

  const onStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }

      const { newValue: rawValue } = event;

      const nextValue = (() => {
        function getInitialState() {
          return initialState instanceof Function ? initialState() : initialState;
        }

        try {
          return rawValue !== null ? JSON.parse(rawValue) : getInitialState();
        } catch {
          return getInitialState();
        }
      })();

      if (nextValue !== valueRef.current) {
        valueRef.current = nextValue;
        setValue(nextValue);
      }
    },
    [key, initialState],
  );

  useEventListener(isBrowser ? window : null, 'storage', onStorage);

  return [value, onChange];
}
