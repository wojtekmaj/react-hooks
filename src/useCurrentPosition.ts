import { useEffect, useState } from 'react';

const isBrowser = typeof document !== 'undefined';

/**
 * Returns current position from Geolocation API.
 *
 * @param {PositionOptions} [options] Options to pass to Geolocation.getCurrentPosition
 *   and Geolocation.watchPosition.
 *   See https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions. WARNING! If you define
 *   the function in component body, make sure to memoize it.
 * @returns {GeolocationCoordinates} Object with latitude and longitude
 */
export default function useCurrentPosition(
  options?: PositionOptions | undefined,
): GeolocationCoordinates | null {
  const [position, setPosition] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    if (!isBrowser || !('geolocation' in navigator)) {
      return undefined;
    }

    const onPositionReceive: PositionCallback = (result) => {
      setPosition(result.coords);
    };

    navigator.geolocation.getCurrentPosition(onPositionReceive, undefined, options);

    const watch = navigator.geolocation.watchPosition(onPositionReceive, undefined, options);

    return () => {
      navigator.geolocation.clearWatch(watch);
    };
  }, [options]);

  return position;
}
