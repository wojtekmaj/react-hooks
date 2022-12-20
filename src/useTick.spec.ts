import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';

import useTick from './useTick';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

vi.useFakeTimers();

describe('useTick()', () => {
  itIfDocumentDefined('should increment the counter in given intervals', () => {
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

  itIfDocumentUndefined('should not do anything', () => {
    const { result } = renderHook(() => useTick(1000));

    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(0);
  });
});
