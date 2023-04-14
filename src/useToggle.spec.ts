import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';

import useToggle from './useToggle';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

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

  itIfDocumentDefined('should toggle the flag properly', () => {
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

  itIfDocumentDefined('should toggle the flag properly with memoized toggleValue', () => {
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
