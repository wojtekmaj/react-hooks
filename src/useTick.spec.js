import { renderHook, act } from '@testing-library/react-hooks';

import useTick from './useTick';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

jest.useFakeTimers();

describe('useTick()', () => {
  it('should return 0 by default', () => {
    const { result } = renderHook(() => useTick());

    expect(result.current).toBe(0);
  });

  itIfDocumentDefined('should increment the counter in given intervals', () => {
    const { result } = renderHook(() => useTick(1000));

    expect(result.current).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(2);
  });
});
