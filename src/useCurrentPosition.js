import { useEffect, useState } from 'react';

const isBrowser = typeof document !== 'undefined';

/**
 * @typedef LatLng
 * @property {number} latitude Latitude
 * @property {number} longitude Longitude
 */

/**
 * Returns current position from Geolocation API.
 *
 * @param {object} [options] Options to pass to Geolocation.getCurrentPosition
 *   and Geolocation.watchPosition. See https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
 * @returns {LatLng} Object with latitude and longitude
 */
export default function useCurrentPosition(options) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!isBrowser || !('geolocation' in navigator)) {
      return undefined;
    }

    function onPositionReceive(result) {
      setPosition(result.coords);
    }

    navigator.geolocation.getCurrentPosition(onPositionReceive, undefined, options);

    const watch = navigator.geolocation.watchPosition(onPositionReceive, undefined, options);

    return () => {
      navigator.geolocation.clearWatch(watch);
    };
  }, []);

  return position;
}
