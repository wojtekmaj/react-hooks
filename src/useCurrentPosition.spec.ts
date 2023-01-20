import { renderHook, act } from '@testing-library/react-hooks';

import useCurrentPosition from './useCurrentPosition';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

describe('useCurrentPosition()', () => {
  let getCurrentPosition: jest.Mock<typeof navigator.geolocation.getCurrentPosition>;
  let watchPosition: jest.Mock<typeof navigator.geolocation.watchPosition>;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      getCurrentPosition = jest.fn();
      watchPosition = jest.fn();

      const geolocation: Partial<Geolocation> = {
        getCurrentPosition,
        watchPosition: (watchPosition = jest.fn()),
        clearWatch: jest.fn(),
      };

      Object.defineProperty(navigator, 'geolocation', {
        configurable: true,
        enumerable: true,
        get: () => undefined,
      });

      jest.spyOn(navigator, 'geolocation', 'get').mockReturnValue(geolocation as Geolocation);
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
    let listener: PositionCallback;
    getCurrentPosition.mockImplementationOnce((successCallback) => {
      listener = successCallback;

      return () => null;
    });

    const { result } = renderHook(() => useCurrentPosition());

    act(() => {
      listener({
        coords: {
          accuracy: 0,
          altitude: 0,
          altitudeAccuracy: 0,
          heading: 0,
          latitude: 0,
          longitude: 0,
          speed: 0,
        },
        timestamp: 0,
      });
    });

    expect(result.current).toEqual({
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 0,
      longitude: 0,
      speed: 0,
    });
  });

  itIfDocumentDefined('should update the flag when watchPosition listener is called', () => {
    let listener: PositionCallback;
    watchPosition.mockImplementationOnce((successCallback) => {
      listener = successCallback;

      return () => 0;
    });

    const { result } = renderHook(() => useCurrentPosition());

    act(() => {
      listener({
        coords: {
          accuracy: 0,
          altitude: 0,
          altitudeAccuracy: 0,
          heading: 0,
          latitude: 0,
          longitude: 0,
          speed: 0,
        },
        timestamp: 0,
      });
    });

    expect(result.current).toEqual({
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 0,
      longitude: 0,
      speed: 0,
    });
  });
});