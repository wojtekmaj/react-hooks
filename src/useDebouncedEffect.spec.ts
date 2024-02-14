import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';

import useDebouncedEffect from './useDebouncedEffect.js';

import type { DependencyList, EffectCallback } from 'react';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');

vi.useFakeTimers();

describe('useDebouncedEffect()', () => {
  itIfDocumentDefined('should call effect after debounce time on mount', () => {
    const fn = vi.fn();

    renderHook(() => useDebouncedEffect(fn, [], 500));

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  itIfDocumentDefined('should call effect after debounce time on dependency change', () => {
    const fn = vi.fn();

    const { rerender } = renderHook<
      {
        effect: EffectCallback;
        deps: DependencyList;
      },
      void
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

  itIfDocumentDefined('should cancel effect on unmount', () => {
    const cleanup = vi.fn();

    const fn = vi.fn().mockReturnValue(cleanup);

    const { unmount } = renderHook<
      {
        effect: EffectCallback;
        deps: DependencyList;
      },
      void
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

  itIfDocumentDefined('should cancel and re-run effect on dependency change', () => {
    const cleanup = vi.fn();

    const fn = vi.fn().mockReturnValue(cleanup);

    const { rerender } = renderHook<
      {
        effect: EffectCallback;
        deps: DependencyList;
      },
      void
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
