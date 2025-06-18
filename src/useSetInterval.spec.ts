import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useSetInterval from './useSetInterval.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

// biome-ignore lint/correctness/useHookAtTopLevel: False positive, see https://github.com/biomejs/biome/issues/6396
vi.useFakeTimers();

describe('useSetInterval()', () => {
  itIfWindowDefined('should run given function in given intervals', () => {
    const fn = vi.fn();

    renderHook(() => useSetInterval(fn, 1000));

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(2);
  });

  itIfWindowUndefined('should not do anything', () => {
    const fn = vi.fn();

    renderHook(() => useSetInterval(fn, 1000));

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(fn).not.toHaveBeenCalled();
  });
});
