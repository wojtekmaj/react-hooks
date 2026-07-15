import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import useDeviceOrientation from './useDeviceOrientation.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useDeviceOrientation()', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  itIfWindowDefined('should return null initially', async () => {
    const { result } = await renderHook(() => useDeviceOrientation());

    expect(result.current).toBe(null);
  });

  itIfWindowDefined('should update when device orientation changes', async () => {
    const { result } = await renderHook(() => useDeviceOrientation());

    act(() => {
      window.dispatchEvent(
        Object.assign(new Event('deviceorientation'), {
          absolute: true,
          alpha: 45,
          beta: -30,
          gamma: 15,
        }),
      );
    });

    expect(result.current).toEqual({
      absolute: true,
      alpha: 45,
      beta: -30,
      gamma: 15,
    });
  });

  itIfWindowDefined('should remove the orientation listener on unmount', async () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener');

    const { unmount } = await renderHook(() => useDeviceOrientation());

    await unmount();

    expect(removeEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledWith('deviceorientation', expect.any(Function));
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => useDeviceOrientation());

    expect(result.current).toBe(null);
  });
});
