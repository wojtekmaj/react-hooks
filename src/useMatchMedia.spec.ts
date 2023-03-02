import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';

import useMatchMedia from './useMatchMedia';

import type { Mock } from 'vitest';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

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

  itIfDocumentDefined('should return the flag initially', () => {
    const { result } = renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    expect(result.current).toBe(true);
  });

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    expect(result.current).toBe(null);
  });

  itIfDocumentDefined('should add listener to MediaQueryList', () => {
    renderHook(() => useMatchMedia('screen and (min-width: 1024px'));

    expect(addEventListener).toHaveBeenCalledTimes(1);
  });

  itIfDocumentDefined('should update the flag when the listener is called', () => {
    let listener: EventListener;
    addEventListener.mockImplementationOnce((type, currentListener) => {
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
