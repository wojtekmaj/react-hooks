import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';

import useSetTimeout from './useSetTimeout';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

vi.useFakeTimers();

describe('useSetTimeout()', () => {
  itIfDocumentDefined('should run given function once after given timeout', () => {
    const fn = vi.fn();

    renderHook(() => useSetTimeout(fn, 1000));

    expect(fn).toHaveBeenCalledTimes(0);

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

    expect(fn).toHaveBeenCalledTimes(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(0);
  });
});
