import { renderHook, act } from '@testing-library/react-hooks';

import useMatchMedia from './useMatchMedia';

describe('useMatchMedia()', () => {
  let addListener;
  let removeListener;

  beforeEach(() => {
    addListener = jest.fn();
    removeListener = jest.fn();

    const mql = {
      matches: true,
      addListener,
      removeListener,
    };

    window.matchMedia = jest.fn().mockReturnValue(mql);
  });

  it('should return the flag initially', () => {
    const { result } = renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    expect(result.current).toBe(true);
  });

  it('should add listener to MediaQueryList', () => {
    renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    expect(addListener).toHaveBeenCalledTimes(1);
  });

  it('should update the flag when the listener is called', () => {
    let listener;
    addListener.mockImplementationOnce((currentListener) => { listener = currentListener; });

    const { result } = renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    act(() => {
      listener({ matches: false });
    });

    expect(result.current).toBe(false);
  });
});
