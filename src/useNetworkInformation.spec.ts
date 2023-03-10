import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import useNetworkInformation from './useNetworkInformation.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useNetworkInformation()', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(navigator, 'connection', {
        configurable: true,
        enumerable: true,
        get: () => undefined,
      });
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  itIfWindowDefined('should return network information object properly', () => {
    const mockConnection = {
      downlink: 10,
      effectiveType: '4g',
      rtt: 50,
      saveData: false,
      addEventListener: () => {
        // Intentionally empty
      },
      removeEventListener: () => {
        // Intentionally empty
      },
    };

    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      enumerable: true,
      get: () => mockConnection,
    });

    const { result } = renderHook(() => useNetworkInformation());

    expect(result.current).toEqual(mockConnection);
  });

  itIfWindowDefined('should subscribe to network information changes', () => {
    const mockConnection = {
      downlink: 10,
      effectiveType: '4g',
      rtt: 50,
      saveData: false,
      addEventListener: vi.fn(),
      removeEventListener: () => {
        // Intentionally empty
      },
    };

    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      enumerable: true,
      get: () => mockConnection,
    });

    renderHook(() => useNetworkInformation());

    expect(mockConnection.addEventListener).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should update the object when event listener is called', () => {
    let changeCallback: (() => void) | null = null;

    const mockConnection1 = {
      downlink: 10,
      effectiveType: '4g',
      rtt: 50,
      saveData: false,
      addEventListener: (event: string, callback: () => void) => {
        if (event === 'change') {
          changeCallback = callback;
        }
      },
      removeEventListener: (event: string, callback: () => void) => {
        if (event === 'change' && changeCallback === callback) {
          changeCallback = null;
        }
      },
    };

    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      enumerable: true,
      get: () => mockConnection1,
    });

    const { result, unmount } = renderHook(() => useNetworkInformation());

    expect(result.current).toEqual(mockConnection1);

    const mockConnection2 = {
      downlink: 20,
      effectiveType: '3g',
      rtt: 100,
      saveData: true,
      addEventListener: mockConnection1.addEventListener,
      removeEventListener: mockConnection1.removeEventListener,
    };

    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      enumerable: true,
      get: () => mockConnection2,
    });

    act(() => {
      changeCallback?.();
    });

    expect(result.current).toEqual(mockConnection2);

    unmount();

    expect(changeCallback).toBe(null);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useNetworkInformation());

    expect(result.current).toBe(null);
  });
});
