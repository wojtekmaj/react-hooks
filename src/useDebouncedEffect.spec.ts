import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useDebouncedEffect from './useDebouncedEffect.js';

import type { DependencyList, EffectCallback } from 'react';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

// biome-ignore lint/correctness/useHookAtTopLevel: False positive, see https://github.com/biomejs/biome/issues/6396
vi.useFakeTimers();

describe('useDebouncedEffect()', () => {
  itIfWindowDefined('should call effect after debounce time on mount', () => {
    const fn = vi.fn();

    renderHook(() => useDebouncedEffect(fn, [], 500));

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should call effect after debounce time on dependency change', () => {
    const fn = vi.fn();

    const { rerender } = renderHook<
      void,
      {
        effect: EffectCallback;
        deps: DependencyList;
      }
    >(({ effect, deps }) => useDebouncedEffect(effect, deps, 500), {
      initialProps: { effect: fn, deps: [1] },
    });

    expect(fn).not.toHaveBeenCalled();

    rerender({ effect: fn, deps: [2] });

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should cancel effect on unmount', () => {
    const cleanup = vi.fn();

    const fn = vi.fn().mockReturnValue(cleanup);

    const { unmount } = renderHook<
      void,
      {
        effect: EffectCallback;
        deps: DependencyList;
      }
    >(({ effect, deps }) => useDebouncedEffect(effect, deps, 500), {
      initialProps: { effect: fn, deps: [] },
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should cancel and re-run effect on dependency change', () => {
    const cleanup = vi.fn();

    const fn = vi.fn().mockReturnValue(cleanup);

    const { rerender } = renderHook<
      void,
      {
        effect: EffectCallback;
        deps: DependencyList;
      }
    >(({ effect, deps }) => useDebouncedEffect(effect, deps, 500), {
      initialProps: { effect: fn, deps: [1] },
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    rerender({ effect: fn, deps: [2] });

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
