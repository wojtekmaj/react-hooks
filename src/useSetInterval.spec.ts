import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';

import useSetInterval from './useSetInterval';

vi.useFakeTimers();

describe('useSetInterval()', () => {
  it('should run given function in given intervals', () => {
    const fn = vi.fn();

    renderHook(() => useSetInterval(fn, 1000));

    expect(fn).toHaveBeenCalledTimes(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
