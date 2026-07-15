import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import useMutationObserverRef from './useMutationObserverRef.js';

import type { Mock } from 'vitest';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

async function waitForAsync() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('useMutationObserverRef()', () => {
  const config = {
    childList: true,
  };

  let observerCallback: MutationCallback;
  let observer: MutationObserver;
  let observe: Mock;
  let disconnect: Mock;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      observe = vi.fn();
      disconnect = vi.fn();

      function MockMutationObserver(callback: MutationCallback) {
        observerCallback = callback;
        observer = {
          observe,
          disconnect,
          takeRecords: () => [],
        };

        return observer;
      }

      Object.defineProperty(window, 'MutationObserver', {
        configurable: true,
        enumerable: true,
        get: () => MockMutationObserver,
      });

      vi.spyOn(window, 'MutationObserver');
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns a ref callback and null initially', async () => {
    const { result } = await renderHook(() => useMutationObserverRef(config));

    expect(result.current[0]).toBeInstanceOf(Function);
    expect(result.current[1]).toBe(null);
  });

  itIfWindowDefined('observes the referenced element and returns its latest records', async () => {
    const element = document.createElement('div');
    const { result } = await renderHook(() => useMutationObserverRef(config));

    act(() => {
      result.current[0](element);
    });

    await waitForAsync();

    expect(window.MutationObserver).toHaveBeenCalledTimes(1);
    expect(window.MutationObserver).toHaveBeenCalledWith(expect.any(Function));
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element, config);

    const childNodes = element.childNodes;
    const record = {
      addedNodes: childNodes,
      attributeName: null,
      attributeNamespace: null,
      nextSibling: null,
      oldValue: null,
      previousSibling: null,
      removedNodes: childNodes,
      target: element,
      type: 'childList',
    } satisfies MutationRecord;
    const records = [record];

    act(() => {
      observerCallback(records, observer);
    });

    expect(result.current[1]).toBe(records);

    act(() => {
      result.current[0](null);
    });

    expect(result.current[1]).toBe(null);
  });
});
