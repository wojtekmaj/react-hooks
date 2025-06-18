import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useSetTimeout from './useSetTimeout.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

// biome-ignore lint/correctness/useHookAtTopLevel: False positive, see https://github.com/biomejs/biome/issues/6396
vi.useFakeTimers();

describe('useSetTimeout()', () => {
  itIfWindowDefined('should run given function once after given timeout', () => {
    const fn = vi.fn();

    renderHook(() => useSetTimeout(fn, 1000));

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  itIfWindowUndefined('should not do anything', () => {
    const fn = vi.fn();

    renderHook(() => useSetTimeout(fn, 1000));

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
