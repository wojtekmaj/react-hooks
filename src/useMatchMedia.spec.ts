import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useMatchMedia from './useMatchMedia.js';

import type { Mock } from 'vitest';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useMatchMedia()', () => {
  let matches: boolean;
  let addEventListener: Mock;
  let removeEventListener: Mock;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      matches = true;
      addEventListener = vi.fn();
      removeEventListener = vi.fn();

      const mql = {
        get matches() {
          return matches;
        },
        addEventListener,
        removeEventListener,
      };

      window.matchMedia = vi.fn().mockReturnValue(mql);
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  itIfWindowDefined('should return the flag initially', () => {
    const { result } = renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    expect(result.current).toBe(true);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    expect(result.current).toBe(null);
  });

  itIfWindowDefined('should add listener to MediaQueryList', () => {
    renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    expect(addEventListener).toHaveBeenCalledTimes(1);
  });

  itIfWindowDefined('should update the flag when the listener is called', () => {
    let listener: EventListener;
    addEventListener.mockImplementationOnce((_type, currentListener) => {
      listener = currentListener;

      return () => null;
    });

    const { result } = renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    act(() => {
      matches = false;
      const mediaQueryListEvent = new MediaQueryListEvent('change', { matches });
      listener(mediaQueryListEvent);
    });

    expect(result.current).toBe(false);
  });

  itIfWindowDefined('should update the flag when the listener is called (legacy)', () => {
    let matches = true;
    const addListener = vi.fn();
    const removeListener = vi.fn();

    const mql = {
      get matches() {
        return matches;
      },
      addListener,
      removeListener,
    };

    window.matchMedia = vi.fn().mockReturnValue(mql);

    let listener: EventListener;
    addListener.mockImplementationOnce((_type, currentListener) => {
      listener = currentListener;

      return () => null;
    });

    const { result } = renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    act(() => {
      matches = false;
      const mediaQueryListEvent = new MediaQueryListEvent('change', { matches });
      listener(mediaQueryListEvent);
    });

    expect(result.current).toBe(false);
  });
});
