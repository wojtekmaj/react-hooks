import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useTick from './useTick.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

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
