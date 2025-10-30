import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useIntersectionObserver from './useIntersectionObserver.js';

import type { Mock } from 'vitest';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

async function waitForAsync() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('useIntersectionObserver()', () => {
  const config = {};

  let observe: Mock;
  let disconnect: Mock;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      observe = vi.fn();
      disconnect = vi.fn();

      function MockIntersectionObserver() {
        return {
          observe,
          unobserve: () => {
            //Intentionally empty
          },
          disconnect,
          root: null,
          rootMargin: '',
          thresholds: [],
          takeRecords: () => {
            return [];
          },
        };
      }

      Object.defineProperty(window, 'IntersectionObserver', {
        configurable: true,
        enumerable: true,
        get: () => MockIntersectionObserver,
      });

      vi.spyOn(window, 'IntersectionObserver');
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing given falsy element', async () => {
    const listener = () => {
      // Intentionally empty
    };

    const { result } = await renderHook(() => useIntersectionObserver(null, config, listener));

    expect(result.current).toBe(undefined);
  });

  itIfWindowDefined('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = () => {
      // Intentionally empty
    };

    await renderHook(() => useIntersectionObserver(element, config, listener));

    await waitForAsync();

    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(window.IntersectionObserver).toHaveBeenCalledWith(listener, config);

    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element);
  });
});
