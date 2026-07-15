import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import useIntersectionObserverRef from './useIntersectionObserverRef.js';

import type { Mock } from 'vitest';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

async function waitForAsync() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('useIntersectionObserverRef()', () => {
  const config = {};

  let observerCallback: IntersectionObserverCallback;
  let observer: IntersectionObserver;
  let observe: Mock;
  let disconnect: Mock;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      observe = vi.fn();
      disconnect = vi.fn();

      function MockIntersectionObserver(callback: IntersectionObserverCallback) {
        observerCallback = callback;
        observer = {
          observe,
          unobserve: () => {
            // Intentionally empty
          },
          disconnect,
          root: null,
          rootMargin: '',
          scrollMargin: '',
          thresholds: [],
          takeRecords: () => [],
        };

        return observer;
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

  it('returns a ref callback and null initially', async () => {
    const { result } = await renderHook(() => useIntersectionObserverRef());

    expect(result.current[0]).toBeInstanceOf(Function);
    expect(result.current[1]).toBe(null);
  });

  itIfWindowDefined('observes the referenced element and returns its latest entry', async () => {
    const element = document.createElement('div');
    const { result } = await renderHook(() => useIntersectionObserverRef(config));

    act(() => {
      result.current[0](element);
    });

    await waitForAsync();

    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(window.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), config);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element);

    const rect = element.getBoundingClientRect();
    const entry = {
      boundingClientRect: rect,
      intersectionRatio: 1,
      intersectionRect: rect,
      isIntersecting: true,
      rootBounds: null,
      target: element,
      time: 0,
    } satisfies IntersectionObserverEntry;

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
