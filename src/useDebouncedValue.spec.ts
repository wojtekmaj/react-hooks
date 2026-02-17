import { describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import useDebouncedValue from './useDebouncedValue.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

vi.useFakeTimers();

describe('useDebouncedValue()', () => {
  it('should return the initial value immediately', async () => {
    const { result } = await renderHook(() => useDebouncedValue('test', 500));

    expect(result.current).toBe('test');
  });

  itIfWindowDefined('should not update the value before the debounce time', async () => {
    const { result, rerender } = await renderHook(
      (props) => {
        if (!props) {
          throw new Error('Props are required');
        }

        const { value, time } = props;

        return useDebouncedValue(value, time);
      },
      {
        initialProps: { value: 'test', time: 500 },
      },
    );

    await rerender({ value: 'updated', time: 500 });

    expect(result.current).toBe('test');
  });

  itIfWindowDefined('should update the value after the debounce time', async () => {
    const { result, rerender } = await renderHook(
      (props) => {
        if (!props) {
          throw new Error('Props are required');
        }

        const { value, time } = props;

        return useDebouncedValue(value, time);
      },
      {
        initialProps: { value: 'test', time: 500 },
      },
    );

    await rerender({ value: 'updated', time: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });
});
