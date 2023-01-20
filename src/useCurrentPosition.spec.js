import { renderHook, act } from '@testing-library/react-hooks';

import useCurrentPosition from './useCurrentPosition';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

describe('useCurrentPosition()', () => {
  let getCurrentPosition;
  let watchPosition;

  beforeEach(() => {
    getCurrentPosition = jest.fn();
    watchPosition = jest.fn();

    if (typeof window !== 'undefined') {
      const geolocation = {
        getCurrentPosition,
        watchPosition,
        clearWatch: () => {},
      };

      navigator.geolocation = geolocation;
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null initially', () => {
    const { result } = renderHook(() => useCurrentPosition());

    expect(result.current).toBe(null);
  });

  itIfDocumentDefined('should get initial position', () => {
    renderHook(() => useCurrentPosition());

    expect(getCurrentPosition).toHaveBeenCalledTimes(1);
  });

  itIfDocumentDefined('should subscribe to position changes', () => {
    renderHook(() => useCurrentPosition());

    expect(watchPosition).toHaveBeenCalledTimes(1);
  });

  itIfDocumentDefined('should update the flag when getCurrentPosition listener is called', () => {
    let listener;
    getCurrentPosition.mockImplementationOnce((currentListener) => {
      listener = currentListener;
    });

    const { result } = renderHook(() => useCurrentPosition());

    act(() => {
      listener({
        coords: {
          latitude: 0,
          longitude: 0,
        },
      });
    });

    expect(result.current).toEqual({
      latitude: 0,
      longitude: 0,
    });
  });

  itIfDocumentDefined('should update the flag when watchPosition listener is called', () => {
    let listener;
    watchPosition.mockImplementationOnce((currentListener) => {
      listener = currentListener;
    });

    const { result } = renderHook(() => useCurrentPosition());

    act(() => {
      listener({
        coords: {
          latitude: 0,
          longitude: 0,
        },
      });
    });

    expect(result.current).toEqual({
      latitude: 0,
      longitude: 0,
    });
  });
});
