import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';

import useSetTimeout from './useSetTimeout';

vi.useFakeTimers();

describe('useSetTimeout()', () => {
  it('should run given function once after given timeout', () => {
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
});
