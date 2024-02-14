import { renderHook, act } from '@testing-library/react-hooks';
import { describe, expect, it, vi } from 'vitest';

import useDebouncedValue from './useDebouncedValue.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');

vi.useFakeTimers();

describe('useDebouncedValue()', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('test', 500));

    expect(result.current).toBe('test');
  });

  itIfDocumentDefined('should not update the value before the debounce time', () => {
    const { result, rerender } = renderHook(({ value, time }) => useDebouncedValue(value, time), {
      initialProps: { value: 'test', time: 500 },
    });

    rerender({ value: 'updated', time: 500 });

    expect(result.current).toBe('test');
  });

  itIfDocumentDefined('should update the value after the debounce time', () => {
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
