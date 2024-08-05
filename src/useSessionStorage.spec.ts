import { afterEach, describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useSessionStorage from './useSessionStorage.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

describe('useSessionStorage()', () => {
  afterEach(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('myKey');
    }
  });

  it('should return initialState value if value in sessionStorage is not given', () => {
    const { result } = renderHook(() => useSessionStorage('myKey', 'initialState'));

    const [value] = result.current;

    expect(value).toBe('initialState');
  });

  itIfWindowDefined('should return value from sessionStorage properly', () => {
    sessionStorage.setItem('myKey', JSON.stringify('foo'));

    const { result } = renderHook(() => useSessionStorage('myKey', 'initialState'));

    const [value] = result.current;

    expect(value).toBe('foo');
  });

  itIfWindowDefined('should return value from sessionStorage properly even if it’s falsy', () => {
    sessionStorage.setItem('myKey', JSON.stringify(0));

    const { result } = renderHook(() => useSessionStorage('myKey', 'initialState'));

    const [value] = result.current;

    expect(value).toBe(0);
  });

  itIfWindowDefined('should update value properly', () => {
    const { result } = renderHook(() => useSessionStorage('myKey'));

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
});
