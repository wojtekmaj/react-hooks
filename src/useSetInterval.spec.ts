import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';

import useSetInterval from './useSetInterval.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

vi.useFakeTimers();

describe('useSetInterval()', () => {
  itIfDocumentDefined('should run given function in given intervals', () => {
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

  itIfDocumentUndefined('should not do anything', () => {
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
