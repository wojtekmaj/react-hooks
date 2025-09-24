import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import useDebouncedValue from './useDebouncedValue.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

vi.useFakeTimers();

describe('useDebouncedValue()', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('test', 500));

    expect(result.current).toBe('test');
  });

  itIfWindowDefined('should not update the value before the debounce time', () => {
    const { result, rerender } = renderHook(({ value, time }) => useDebouncedValue(value, time), {
      initialProps: { value: 'test', time: 500 },
    });

    rerender({ value: 'updated', time: 500 });

    expect(result.current).toBe('test');
  });

  itIfWindowDefined('should update the value after the debounce time', () => {
    const { result, rerender } = renderHook(({ value, time }) => useDebouncedValue(value, time), {
      initialProps: { value: 'test', time: 500 },
    });

    rerender({ value: 'updated', time: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });
});
