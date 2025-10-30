import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react-dom/test-utils';

import useCurrentPosition from './useCurrentPosition.js';

import type { Mock } from 'vitest';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

describe('useCurrentPosition()', () => {
  let getCurrentPosition: Mock;
  let watchPosition: Mock;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      getCurrentPosition = vi.fn();
      watchPosition = vi.fn();

      const geolocation: Partial<Geolocation> = {
        getCurrentPosition,
        watchPosition,
        clearWatch: vi.fn(),
      };

      Object.defineProperty(navigator, 'geolocation', {
        configurable: true,
        enumerable: true,
        get: () => undefined,
      });

      vi.spyOn(navigator, 'geolocation', 'get').mockReturnValue(geolocation as Geolocation);
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return null initially', async () => {
    const { result } = await renderHook(() => useCurrentPosition());

    expect(result.current).toBe(null);
  });

  itIfWindowDefined('should get initial position', async () => {
    await renderHook(() => useCurrentPosition());

    expect(getCurrentPosition).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should subscribe to position changes', async () => {
    await renderHook(() => useCurrentPosition());

    expect(watchPosition).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined(
    'should update the flag when getCurrentPosition listener is called',
    async () => {
      let listener: PositionCallback;
      getCurrentPosition.mockImplementationOnce((successCallback) => {
        listener = successCallback;

        return () => null;
      });

      const { result } = await renderHook(() => useCurrentPosition());

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
            toJSON: () => '<mocked json>',
          },
          timestamp: 0,
          toJSON: () => '<mocked json>',
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
        toJSON: expect.any(Function),
      });
    },
  );

  itIfWindowDefined('should update the flag when watchPosition listener is called', async () => {
    let listener: PositionCallback;
    watchPosition.mockImplementationOnce((successCallback) => {
      listener = successCallback;

      return () => 0;
    });

    const { result } = await renderHook(() => useCurrentPosition());

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
          toJSON: () => '<mocked json>',
        },
        timestamp: 0,
        toJSON: () => '<mocked json>',
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
      toJSON: expect.any(Function),
    });
  });
});
