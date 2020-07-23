import { renderHook, act } from '@testing-library/react-hooks';

import useSetTimeout from './useSetTimeout';

jest.useFakeTimers();

describe('useSetTimeout()', () => {
  it('should run given function once after given timeout', () => {
    const fn = jest.fn();

    renderHook(() => useSetTimeout(fn, 1000));

    expect(fn).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
