import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useResizeObserver from './useResizeObserver';

import type { Mock, SpyInstance } from 'vitest';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

async function waitForAsync() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('useResizeObserver()', () => {
  const config = {};

  let observe: Mock;
  let disconnect: Mock;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      observe = vi.fn();
      disconnect = vi.fn();

      Object.defineProperty(window, 'ResizeObserver', {
        configurable: true,
        enumerable: true,
        get: () => () => {
          // Intentionally empty
        },
      });

      const mockResizeObserver = vi.spyOn(window, 'ResizeObserver');
      (
        mockResizeObserver as SpyInstance<
          [callback: ResizeObserverCallback],
          Partial<ResizeObserver>
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

    const { result } = renderHook(() => useResizeObserver(null, config, listener));

    expect(result.current).toBe(undefined);
  });

  itIfDocumentDefined('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = () => {
      // Intentionally empty
    };

    renderHook(() => useResizeObserver(element, config, listener));

    await waitForAsync();

    expect(window.ResizeObserver).toHaveBeenCalledTimes(1);
    expect(window.ResizeObserver).toHaveBeenCalledWith(listener);

    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element, config);
  });
});
