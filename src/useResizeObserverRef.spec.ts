import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import useResizeObserverRef from './useResizeObserverRef.js';

import type { Mock } from 'vitest';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

async function waitForAsync() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('useResizeObserverRef()', () => {
  const config = {};

  let observerCallback: ResizeObserverCallback;
  let observer: ResizeObserver;
  let observe: Mock;
  let disconnect: Mock;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      observe = vi.fn();
      disconnect = vi.fn();

      function MockResizeObserver(callback: ResizeObserverCallback) {
        observerCallback = callback;
        observer = {
          observe,
          unobserve: () => {
            // Intentionally empty
          },
          disconnect,
        };

        return observer;
      }

      Object.defineProperty(window, 'ResizeObserver', {
        configurable: true,
        enumerable: true,
        get: () => MockResizeObserver,
      });

      vi.spyOn(window, 'ResizeObserver');
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns a ref callback and null initially', async () => {
    const { result } = await renderHook(() => useResizeObserverRef());

    expect(result.current[0]).toBeInstanceOf(Function);
    expect(result.current[1]).toBe(null);
  });

  itIfWindowDefined('observes the referenced element and returns its latest entry', async () => {
    const element = document.createElement('div');
    const { result } = await renderHook(() => useResizeObserverRef(config));

    act(() => {
      result.current[0](element);
    });

    await waitForAsync();

    expect(window.ResizeObserver).toHaveBeenCalledTimes(1);
    expect(window.ResizeObserver).toHaveBeenCalledWith(expect.any(Function));
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element, config);

    const entry = {
      borderBoxSize: [],
      contentBoxSize: [],
      contentRect: element.getBoundingClientRect(),
      devicePixelContentBoxSize: [],
      target: element,
    } satisfies ResizeObserverEntry;

    act(() => {
      observerCallback([entry], observer);
    });

    expect(result.current[1]).toBe(entry);

    act(() => {
      result.current[0](null);
    });

    expect(result.current[1]).toBe(null);
  });
});
