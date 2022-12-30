import { renderHook, act } from '@testing-library/react-hooks';

import useSetInterval from './useSetInterval';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

jest.useFakeTimers();

describe('useSetInterval()', () => {
  itIfDocumentDefined('should run given function in given intervals', () => {
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
