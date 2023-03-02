import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useIntersectionObserver from './useIntersectionObserver';

import type { Mock, SpyInstance } from 'vitest';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

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

      Object.defineProperty(window, 'IntersectionObserver', {
        configurable: true,
        enumerable: true,
        get: () => () => {
          // Intentionally empty
        },
      });

      const mockIntersectionObserver = vi.spyOn(window, 'IntersectionObserver');

      (
        mockIntersectionObserver as SpyInstance<
          [callback: IntersectionObserverCallback, options?: IntersectionObserverInit | undefined],
          Partial<IntersectionObserver>
        >
      ).mockImplementation(() => ({
        observe,
        disconnect,
      }));
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing given falsy element', () => {
    const listener = () => {
      // Intentionally empty
    };

    const { result } = renderHook(() => useIntersectionObserver(null, config, listener));

    expect(result.current).toBe(undefined);
  });

  itIfDocumentDefined('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = () => {
      // Intentionally empty
    };

    renderHook(() => useIntersectionObserver(element, config, listener));

    await waitForAsync();

    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(window.IntersectionObserver).toHaveBeenCalledWith(listener, config);

    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element);
  });
});
