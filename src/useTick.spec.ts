import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import useTick from './useTick.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

// biome-ignore lint/correctness/useHookAtTopLevel: False positive, see https://github.com/biomejs/biome/issues/6396
vi.useFakeTimers();

describe('useTick()', () => {
  itIfWindowDefined('should increment the counter in given intervals', () => {
    const { result } = renderHook(() => useTick(1000));

    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(2);
  });

  itIfWindowUndefined('should not do anything', () => {
    const { result } = renderHook(() => useTick(1000));

    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(0);
  });
});
