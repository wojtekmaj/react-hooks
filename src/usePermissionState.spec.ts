import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import usePermissionState from './usePermissionState.js';

import type { Mock, MockInstance } from 'vitest';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('usePermissionState()', () => {
  let state: PermissionState;
  let query: MockInstance;
  let addEventListener: Mock;
  let removeEventListener: Mock;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      state = 'granted';
      addEventListener = vi.fn();
      removeEventListener = vi.fn();

      Object.defineProperty(navigator, 'permissions', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {
          query: vi.fn(),
        },
      });

      query = vi.spyOn(navigator.permissions, 'query');

      query.mockImplementation(async () => ({
        get state() {
          return state;
        },
        addEventListener,
        removeEventListener,
      }));

      Object.defineProperty(window, 'Notification', {
        configurable: true,
        enumerable: true,
        get: () => ({
          get permission() {
            return state;
          },
        }),
      });
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  itIfWindowDefined('should return navigator.permissions.query result initially', async () => {
    const { result } = await renderHook(() => usePermissionState({ name: 'geolocation' }));

    expect(result.current).toBe('granted');
  });

  itIfWindowDefined(
    'should return Notification.permission initially given name "notifications"',
    async () => {
      const { result } = await renderHook(() => usePermissionState({ name: 'notifications' }));

      expect(result.current).toBe('granted');
    },
  );

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => usePermissionState({ name: 'geolocation' }));

    expect(result.current).toBe(null);
  });

  itIfWindowDefined('should query permissions', async () => {
    await renderHook(() => usePermissionState({ name: 'geolocation' }));

    expect(query).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should add listener', async () => {
    await renderHook(() => usePermissionState({ name: 'geolocation' }));

    expect(addEventListener).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should update the flag when the listener is called', async () => {
    let listener: EventListener;
    addEventListener.mockImplementationOnce((_type, currentListener) => {
      listener = currentListener;

      return () => null;
    });

    const { result } = await renderHook(() => usePermissionState({ name: 'geolocation' }));

    act(() => {
      state = 'denied';
      const event = new Event('change');
      listener(event);
    });

    expect(result.current).toBe('denied');
  });
});
