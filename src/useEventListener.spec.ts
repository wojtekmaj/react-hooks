import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useEventListener from './useEventListener.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

describe('useEventListener()', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing given falsy element', async () => {
    const type = 'click';
    const listener = () => {
      // Intentionally empty
    };

    const { result } = await renderHook(() => useEventListener(null, type, listener));

    expect(result.current).toBe(undefined);
  });

  itIfWindowDefined('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    vi.spyOn(element, 'addEventListener');

    const type = 'click';
    const listener = () => {
      // Intentionally empty
    };

    await renderHook(() => useEventListener(element, type, listener));

    expect(element.addEventListener).toHaveBeenCalledTimes(1);
    expect(element.addEventListener).toHaveBeenCalledWith(type, listener);
  });

  itIfWindowDefined(
    'should allow storage handler to be passed if element is window and type is storage',
    async () => {
      const element = window;
      vi.spyOn(element, 'addEventListener');

      const type = 'storage';
      const listener = (_event: StorageEvent) => {
        // Intentionally empty
      };

      await renderHook(() => useEventListener(element, type, listener));
    },
  );

  itIfWindowDefined(
    'should allow storage handler to be passed if element is document and type is visibilitychange',
    async () => {
      const element = document;
      vi.spyOn(element, 'addEventListener');

      const type = 'visibilitychange';
      const listener = (_event: Event) => {
        // Intentionally empty
      };

      await renderHook(() => useEventListener(element, type, listener));
    },
  );
});
