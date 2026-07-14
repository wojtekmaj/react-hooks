import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import useWindowSize from './useWindowSize.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useWindowSize()', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  itIfWindowDefined('should return the window size initially', async () => {
    const { result } = await renderHook(() => useWindowSize());

    expect(result.current).toEqual({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  itIfWindowDefined('should update when the window is resized', async () => {
    let width = 1024;
    let height = 768;

    vi.spyOn(window, 'innerWidth', 'get').mockImplementation(() => width);
    vi.spyOn(window, 'innerHeight', 'get').mockImplementation(() => height);

    const { result } = await renderHook(() => useWindowSize());

    expect(result.current).toEqual({ width: 1024, height: 768 });

    act(() => {
      width = 1440;
      height = 900;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ width: 1440, height: 900 });
  });

  itIfWindowDefined('should remove the resize listener on unmount', async () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener');

    const { unmount } = await renderHook(() => useWindowSize());

    expect(removeEventListener).not.toHaveBeenCalled();

    await unmount();

    expect(removeEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => useWindowSize());

    expect(result.current).toBe(null);
  });
});
