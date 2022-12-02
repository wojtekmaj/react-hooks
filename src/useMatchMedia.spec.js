import { renderHook, act } from '@testing-library/react-hooks';

import useMatchMedia from './useMatchMedia';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

describe('useMatchMedia()', () => {
  let addListener;
  let removeListener;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      addListener = jest.fn();
      removeListener = jest.fn();

      const mql = {
        matches: true,
        addListener,
        removeListener,
      };

      window.matchMedia = jest.fn().mockReturnValue(mql);
    }
  });

  itIfDocumentDefined('should return the flag initially', () => {
    const { result } = renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    expect(result.current).toBe(true);
  });

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    expect(result.current).toBe(null);
  });

  itIfDocumentDefined('should add listener to MediaQueryList', () => {
    renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    expect(addListener).toHaveBeenCalledTimes(1);
  });

  itIfDocumentDefined('should update the flag when the listener is called', () => {
    let listener;
    addListener.mockImplementationOnce((currentListener) => {
      listener = currentListener;
    });

    const { result } = renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    act(() => {
      listener({ matches: false });
    });

    expect(result.current).toBe(false);
  });
});
