import { useCallback, useState } from 'react';

import useEventListener from './useEventListener.js';

type DeviceOrientation = Pick<DeviceOrientationEvent, 'absolute' | 'alpha' | 'beta' | 'gamma'>;

const isBrowser = typeof window !== 'undefined';

/**
 * Returns the device's current physical orientation.
 *
 * @returns {DeviceOrientation | null} Object with the device's current orientation
 */
export default function useDeviceOrientation(): DeviceOrientation | null {
  const [orientation, setOrientation] = useState<DeviceOrientation | null>(null);

  const handleDeviceOrientation = useCallback((event: DeviceOrientationEvent) => {
    const { absolute, alpha, beta, gamma } = event;

    setOrientation({ absolute, alpha, beta, gamma });
  }, []);

  useEventListener(isBrowser ? window : null, 'deviceorientation', handleDeviceOrientation);

  return orientation;
}
