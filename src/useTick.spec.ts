import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';

import useTick from './useTick';

vi.useFakeTimers();

describe('useTick()', () => {
  it('should increment the counter in given intervals', () => {
    const { result } = renderHook(() => useTick(1000));

    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(2);
  });
});
