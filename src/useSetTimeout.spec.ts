import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useSetTimeout from './useSetTimeout.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

vi.useFakeTimers();

describe('useSetTimeout()', () => {
  itIfDocumentDefined('should run given function once after given timeout', () => {
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

  itIfDocumentUndefined('should not do anything', () => {
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
