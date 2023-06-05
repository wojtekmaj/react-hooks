import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useNetworkInformation from './useNetworkInformation';

type NetworkInformation = {
  addEventListener: (event: string, callback: () => void) => void;
  downlink: number;
  downlinkMax?: number;
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  removeEventListener: (event: string, callback: () => void) => void;
  rtt: number;
  saveData: boolean;
  type?:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'mixed'
    | 'none'
    | 'wifi'
    | 'wimax'
    | 'other'
    | 'unknown';
};

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

describe('useNetworkInformation()', () => {
  itIfDocumentDefined('should return null if navigator.connection is not defined', () => {
    const { result } = renderHook(() => useNetworkInformation());

    expect(result.current).toBe(null);
  });

  itIfDocumentDefined(
    'should return network information if navigator.connection is defined',
    () => {
      const connection = {
        addEventListener: () => {},
        downlink: 10,
        effectiveType: '4g',
        removeEventListener: () => {},
        rtt: 50,
        saveData: false,
      } satisfies NetworkInformation;

      (navigator as Navigator & Record<'connection', NetworkInformation>).connection = connection;

      const { result } = renderHook(() => useNetworkInformation());

      expect(result.current).toBe(connection);
    },
  );

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useNetworkInformation());

    expect(result.current).toBe(null);
  });
});
