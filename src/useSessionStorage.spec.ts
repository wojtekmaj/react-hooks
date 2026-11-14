import { afterEach, describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import useSessionStorage from './useSessionStorage.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

describe('useSessionStorage()', () => {
  afterEach(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('myKey');
    }
  });

  it('should return initialState value if value in sessionStorage is not given (initialState is a value)', async () => {
    const { result } = await renderHook(() => useSessionStorage('myKey', 'initialState'));

    const [value] = result.current;

    expect(value).toBe('initialState');
  });

  it('should return initialState value if value in sessionStorage is not given (initialState is a function)', async () => {
    const { result } = await renderHook(() => useSessionStorage('myKey', () => 'initialState'));

    const [value] = result.current;

    expect(value).toBe('initialState');
  });

  itIfWindowDefined(
    'should return initialState if value in sessionStorage is not valid JSON (initialState is a value)',
    async () => {
      sessionStorage.setItem('myKey', 'invalid JSON');

      const { result } = await renderHook(() => useSessionStorage('myKey', 'initialState'));

      const [value] = result.current;

      expect(value).toBe('initialState');
    },
  );

  itIfWindowDefined(
    'should return initialState if value in sessionStorage is not valid JSON (initialState is a function)',
    async () => {
      sessionStorage.setItem('myKey', 'invalid JSON');

      const { result } = await renderHook(() => useSessionStorage('myKey', () => 'initialState'));

      const [value] = result.current;

      expect(value).toBe('initialState');
    },
  );

  itIfWindowDefined('should return value from sessionStorage properly', async () => {
    sessionStorage.setItem('myKey', JSON.stringify('foo'));

    const { result } = await renderHook(() => useSessionStorage('myKey', 'initialState'));

    const [value] = result.current;

    expect(value).toBe('foo');
  });

  itIfWindowDefined(
    'should return value from sessionStorage properly even if it’s falsy',
    async () => {
      sessionStorage.setItem('myKey', JSON.stringify(0));

      const { result } = await renderHook(() => useSessionStorage('myKey', 'initialState'));

      const [value] = result.current;

      expect(value).toBe(0);
    },
  );

  itIfWindowDefined('should update value properly', async () => {
    const { result } = await renderHook(() => useSessionStorage('myKey'));

    const [, setValue] = result.current;

    act(() => {
      setValue('foo');
    });

    const [value2, setValue2] = result.current;

    expect(value2).toBe('foo');
    if (typeof window !== 'undefined') {
      const rawValue = sessionStorage.getItem('myKey');

      if (!rawValue) {
        throw new Error('rawValue is null');
      }

      expect(JSON.parse(rawValue)).toBe('foo');
    }

    act(() => {
      setValue2((prevValue: string) => {
        expect(prevValue).toBe('foo');
        return 'bar';
      });
    });

    const [value3] = result.current;

    expect(value3).toBe('bar');
    if (typeof window !== 'undefined') {
      const rawValue = sessionStorage.getItem('myKey');

      if (!rawValue) {
        throw new Error('rawValue is null');
      }

      expect(JSON.parse(rawValue)).toBe('bar');
    }
  });

  itIfWindowDefined('should update value properly with batched functional updates', async () => {
    const { result } = await renderHook(() => useSessionStorage('myKey', 0));

    const [, setValue] = result.current;

    act(() => {
      setValue((prevValue) => prevValue + 1);
      setValue((prevValue) => prevValue + 1);
    });

    const [value] = result.current;

    expect(value).toBe(2);
    expect(sessionStorage.getItem('myKey')).toBe('2');
  });

  itIfWindowDefined('should update value properly after a storage event', async () => {
    const { result } = await renderHook(() => useSessionStorage('myKey', 0));

    const [, setValue] = result.current;

    act(() => {
      setValue(5);
      window.dispatchEvent(new StorageEvent('storage', { key: 'myKey', newValue: '0' }));
      setValue((prevValue) => prevValue + 1);
    });

    const [value] = result.current;

    expect(value).toBe(1);
    expect(sessionStorage.getItem('myKey')).toBe('1');
  });

  itIfWindowDefined(
    'should return initialState after a storage event with invalid JSON',
    async () => {
      sessionStorage.setItem('myKey', JSON.stringify('foo'));

      const { result } = await renderHook(() => useSessionStorage('myKey', 'initialState'));

      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', { key: 'myKey', newValue: 'invalid JSON' }),
        );
      });

      const [value] = result.current;

      expect(value).toBe('initialState');
    },
  );
});
