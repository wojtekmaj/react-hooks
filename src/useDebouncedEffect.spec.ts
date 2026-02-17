import { describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import useDebouncedEffect from './useDebouncedEffect.js';

import type { DependencyList, EffectCallback } from 'react';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

vi.useFakeTimers();

describe('useDebouncedEffect()', () => {
  itIfWindowDefined('should call effect after debounce time on mount', async () => {
    const fn = vi.fn();

    await renderHook(() => useDebouncedEffect(fn, [], 500));

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should call effect after debounce time on dependency change', async () => {
    const fn = vi.fn();

    const { rerender } = await renderHook<
      {
        effect: EffectCallback;
        deps: DependencyList;
      },
      void
    >(
      (props) => {
        if (!props) {
          throw new Error('Props are required');
        }

        const { effect, deps } = props;

        return useDebouncedEffect(effect, deps, 500);
      },
      {
        initialProps: { effect: fn, deps: [1] },
      },
    );

    expect(fn).not.toHaveBeenCalled();

    await rerender({ effect: fn, deps: [2] });

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should cancel effect on unmount', async () => {
    const cleanup = vi.fn();

    const fn = vi.fn().mockReturnValue(cleanup);

    const { unmount } = await renderHook<
      {
        effect: EffectCallback;
        deps: DependencyList;
      },
      void
    >(
      (props) => {
        if (!props) {
          throw new Error('Props are required');
        }

        const { effect, deps } = props;

        return useDebouncedEffect(effect, deps, 500);
      },
      {
        initialProps: { effect: fn, deps: [] },
      },
    );

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    await unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should cancel and re-run effect on dependency change', async () => {
    const cleanup = vi.fn();

    const fn = vi.fn().mockReturnValue(cleanup);

    const { rerender } = await renderHook<
      {
        effect: EffectCallback;
        deps: DependencyList;
      },
      void
    >(
      (props) => {
        if (!props) {
          throw new Error('Props are required');
        }

        const { effect, deps } = props;

        return useDebouncedEffect(effect, deps, 500);
      },
      {
        initialProps: { effect: fn, deps: [1] },
      },
    );

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    await rerender({ effect: fn, deps: [2] });

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
