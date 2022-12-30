import { renderHook, act } from '@testing-library/react-hooks';

import useSetTimeout from './useSetTimeout';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

jest.useFakeTimers();

describe('useSetTimeout()', () => {
  itIfDocumentDefined('should run given function once after given timeout', () => {
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
