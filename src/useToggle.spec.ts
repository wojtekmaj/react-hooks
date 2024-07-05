import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useToggle from './useToggle.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

describe('useToggle()', () => {
  it('should return false value by default', () => {
    const { result } = renderHook(() => useToggle());

    const [value] = result.current;

    expect(value).toBe(false);
  });

  it('should return default value properly if given', () => {
    const { result } = renderHook(() => useToggle(true));

    const [value] = result.current;

    expect(value).toBe(true);
  });

  itIfWindowDefined('should toggle the flag properly', () => {
    const { result } = renderHook(() => useToggle());

    const [value, toggleValue] = result.current;

    expect(value).toBe(false);

    act(() => {
      toggleValue();
    });

    const [value2, toggleValue2] = result.current;

    expect(value2).toBe(true);

    act(() => {
      toggleValue2();
    });

    const [value3] = result.current;

    expect(value3).toBe(false);
  });

  itIfWindowDefined('should toggle the flag properly with memoized toggleValue', () => {
    const { result } = renderHook(() => useToggle());

    const [value, toggleValue] = result.current;

    expect(value).toBe(false);

    act(() => {
      toggleValue();
    });

    const [value2] = result.current;

    expect(value2).toBe(true);

    act(() => {
      toggleValue();
    });

    const [value3] = result.current;

    expect(value3).toBe(false);
  });
});
