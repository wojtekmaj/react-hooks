import { afterEach, describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useLocalStorage from './useLocalStorage.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

describe('useLocalStorage()', () => {
  afterEach(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('myKey');
    }
  });

  it('should return initialState value if value in localStorage is not given (initialState is a value)', () => {
    const { result } = renderHook(() => useLocalStorage('myKey', 'initialState'));

    const [value] = result.current;

    expect(value).toBe('initialState');
  });

  it('should return initialState value if value in localStorage is not given (initialState is a function)', () => {
    const { result } = renderHook(() => useLocalStorage('myKey', () => 'initialState'));

    const [value] = result.current;

    expect(value).toBe('initialState');
  });

  itIfWindowDefined(
    'should return initialState if value in localStorage is not valid JSON (initialState is a value)',
    () => {
      localStorage.setItem('myKey', 'invalid JSON');

      const { result } = renderHook(() => useLocalStorage('myKey', 'initialState'));

      const [value] = result.current;

      expect(value).toBe('initialState');
    },
  );

  itIfWindowDefined(
    'should return initialState if value in localStorage is not valid JSON (initialState is a function)',
    () => {
      localStorage.setItem('myKey', 'invalid JSON');

      const { result } = renderHook(() => useLocalStorage('myKey', () => 'initialState'));

      const [value] = result.current;

      expect(value).toBe('initialState');
    },
  );

  itIfWindowDefined('should return value from localStorage properly', () => {
    localStorage.setItem('myKey', JSON.stringify('foo'));

    const { result } = renderHook(() => useLocalStorage('myKey', 'initialState'));

    const [value] = result.current;

    expect(value).toBe('foo');
  });

  itIfWindowDefined('should return value from localStorage properly even if it’s falsy', () => {
    localStorage.setItem('myKey', JSON.stringify(0));

    const { result } = renderHook(() => useLocalStorage('myKey', 'initialState'));

    const [value] = result.current;

    expect(value).toBe(0);
  });

  itIfWindowDefined('should update value properly', () => {
    const { result } = renderHook(() => useLocalStorage('myKey'));

    const [, setValue] = result.current;

    act(() => {
      setValue('foo');
    });

    const [value2, setValue2] = result.current;

    expect(value2).toBe('foo');
    if (typeof window !== 'undefined') {
      const rawValue = localStorage.getItem('myKey');

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
      const rawValue = localStorage.getItem('myKey');

      if (!rawValue) {
        throw new Error('rawValue is null');
      }

      expect(JSON.parse(rawValue)).toBe('bar');
    }
  });
});
