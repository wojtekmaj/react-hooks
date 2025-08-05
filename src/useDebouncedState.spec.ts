import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import useDebouncedState from './useDebouncedState.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

// biome-ignore lint/correctness/useHookAtTopLevel: False positive, see https://github.com/biomejs/biome/issues/6396
vi.useFakeTimers();

describe('useDebouncedState()', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedState('test', 500));

    expect(result.current).toEqual(['test', expect.any(Function)]);
  });

  itIfWindowDefined('should not update the value before the debounce time', () => {
    const { result } = renderHook(() => useDebouncedState('test', 500));

    const [, setValue] = result.current;

    setValue('updated');

    expect(result.current).toEqual(['test', expect.any(Function)]);
  });

  itIfWindowDefined('should update the value after the debounce time', () => {
    const { result, rerender } = renderHook(({ value, time }) => useDebouncedState(value, time), {
      initialProps: { value: 'test', time: 500 },
    });

    const [, setValue] = result.current;

    setValue('updated');

    // Simulate rerender
    rerender({ value: 'updated', time: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toEqual(['updated', expect.any(Function)]);
  });
});
