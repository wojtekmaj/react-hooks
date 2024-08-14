import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import usePermissionState from './usePermissionState.js';

import type { Mock, MockInstance } from 'vitest';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

async function waitForAsync() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

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

  itIfWindowDefined('should return null initially', async () => {
    const { result } = renderHook(() => usePermissionState({ name: 'geolocation' }));

    expect(result.current).toBe(null);

    await act(() => waitForAsync());
  });

  itIfWindowDefined(
    'should return Notification.permission initially given name "notifications"',
    async () => {
      const { result } = renderHook(() => usePermissionState({ name: 'notifications' }));

      expect(result.current).toBe('granted');

      await act(() => waitForAsync());
    },
  );

  itIfWindowUndefined('should return null', async () => {
    const { result } = renderHook(() => usePermissionState({ name: 'geolocation' }));

    expect(result.current).toBe(null);

    await act(() => waitForAsync());
  });

  itIfWindowDefined('should query permissions', async () => {
    renderHook(() => usePermissionState({ name: 'geolocation' }));

    await act(() => waitForAsync());

    expect(query).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should add listener', async () => {
    renderHook(() => usePermissionState({ name: 'geolocation' }));

    await act(() => waitForAsync());

    expect(addEventListener).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should update the flag when the listener is called', async () => {
    let listener: EventListener;
    addEventListener.mockImplementationOnce((_type, currentListener) => {
      listener = currentListener;

      return () => null;
    });

    const { result } = renderHook(() => usePermissionState({ name: 'geolocation' }));

    await act(() => waitForAsync());

    act(() => {
      state = 'denied';
      const event = new Event('change');
      listener(event);
    });

    expect(result.current).toBe('denied');
  });
});
