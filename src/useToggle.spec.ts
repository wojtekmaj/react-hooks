import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react-dom/test-utils';

import useToggle from './useToggle.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

describe('useToggle()', () => {
  it('should return false value by default', async () => {
    const { result } = await renderHook(() => useToggle());

    const [value] = result.current;

    expect(value).toBe(false);
  });

  it('should return default value properly if given', async () => {
    const { result } = await renderHook(() => useToggle(true));

    const [value] = result.current;

    expect(value).toBe(true);
  });

  itIfWindowDefined('should toggle the flag properly', async () => {
    const { result } = await renderHook(() => useToggle());

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

  itIfWindowDefined('should toggle the flag properly with memoized toggleValue', async () => {
    const { result } = await renderHook(() => useToggle());

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
