import { renderHook, act } from '@testing-library/react-hooks';
import { describe, expect, it, vi } from 'vitest';

import useDebouncedState from './useDebouncedState.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');

vi.useFakeTimers();

describe('useDebouncedState()', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedState('test', 500));

    expect(result.current).toEqual(['test', expect.any(Function)]);
  });

  itIfDocumentDefined('should not update the value before the debounce time', () => {
    const { result } = renderHook(() => useDebouncedState('test', 500));

    const [, setValue] = result.current;

    setValue('updated');

    expect(result.current).toEqual(['test', expect.any(Function)]);
  });

  itIfDocumentDefined('should update the value after the debounce time', () => {
    const { result } = renderHook(() => useDebouncedState('test', 500));

    const [, setValue] = result.current;

    setValue('updated');

    vi.runAllTimers();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toEqual(['updated', expect.any(Function)]);
  });
});
