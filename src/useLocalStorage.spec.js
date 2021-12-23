import { renderHook, act } from '@testing-library/react-hooks';

import useLocalStorage from './useLocalStorage';

const itIfWindowDefined = typeof window !== 'undefined' ? it : it.skip;

describe('useLocalStorage()', () => {
  afterEach(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('myKey');
    }
  });

  it('should return initialState value if value in localStorage is not given', () => {
    const { result } = renderHook(() => useLocalStorage('myKey', 'initialState'));

    const [value] = result.current;

    expect(value).toBe('initialState');
  });

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

  it('should update value properly', () => {
    const { result } = renderHook(() => useLocalStorage('myKey'));

    const [, setValue] = result.current;

    act(() => {
      setValue('foo');
    });

    const [value2, setValue2] = result.current;

    expect(value2).toBe('foo');
    if (typeof window !== 'undefined') {
      expect(JSON.parse(localStorage.getItem('myKey'))).toBe('foo');
    }

    act(() => {
      setValue2((prevValue) => {
        expect(prevValue).toBe('foo');
        return 'bar';
      });
    });

    const [value3] = result.current;

    expect(value3).toBe('bar');
    if (typeof window !== 'undefined') {
      expect(JSON.parse(localStorage.getItem('myKey'))).toBe('bar');
    }
  });
});
