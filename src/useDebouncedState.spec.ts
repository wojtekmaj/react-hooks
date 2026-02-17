import { describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import useDebouncedState from './useDebouncedState.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

vi.useFakeTimers();

describe('useDebouncedState()', () => {
  it('should return the initial value immediately', async () => {
    const { result } = await renderHook(() => useDebouncedState('test', 500));

    expect(result.current).toEqual(['test', expect.any(Function)]);
  });

  itIfWindowDefined('should not update the value before the debounce time', async () => {
    const { result } = await renderHook(() => useDebouncedState('test', 500));

    const [, setValue] = result.current;

    setValue('updated');

    expect(result.current).toEqual(['test', expect.any(Function)]);
  });

  itIfWindowDefined('should update the value after the debounce time', async () => {
    const { result, rerender } = await renderHook(
      (props) => {
        if (!props) {
          throw new Error('Props are required');
        }

        const { value, time } = props;

        return useDebouncedState(value, time);
      },
      {
        initialProps: { value: 'test', time: 500 },
      },
    );

    const [, setValue] = result.current;

    setValue('updated');

    // Simulate rerender
    await rerender({ value: 'updated', time: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toEqual(['updated', expect.any(Function)]);
  });
});
