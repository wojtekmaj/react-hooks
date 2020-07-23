import { renderHook, act } from '@testing-library/react-hooks';

import useSetInterval from './useSetInterval';

jest.useFakeTimers();

describe('useSetInterval()', () => {
  it('should run given function in given intervals', () => {
    const fn = jest.fn();

    renderHook(() => useSetInterval(fn, 1000));

    expect(fn).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
