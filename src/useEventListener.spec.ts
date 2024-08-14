import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useEventListener from './useEventListener.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

describe('useEventListener()', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing given falsy element', () => {
    const type = 'click';
    const listener = () => {
      // Intentionally empty
    };

    const { result } = renderHook(() => useEventListener(null, type, listener));

    expect(result.current).toBe(undefined);
  });

  itIfWindowDefined('attaches event listener to element properly', () => {
    const element = document.createElement('div');
    vi.spyOn(element, 'addEventListener');

    const type = 'click';
    const listener = () => {
      // Intentionally empty
    };

    renderHook(() => useEventListener(element, type, listener));

    expect(element.addEventListener).toHaveBeenCalledTimes(1);
    expect(element.addEventListener).toHaveBeenCalledWith(type, listener);
  });

  itIfWindowDefined(
    'should allow storage handler to be passed if element is window and type is storage',
    () => {
      const element = window;
      vi.spyOn(element, 'addEventListener');

      const type = 'storage';
      const listener = (_event: StorageEvent) => {
        // Intentionally empty
      };

      renderHook(() => useEventListener(element, type, listener));
    },
  );

  itIfWindowDefined(
    'should allow storage handler to be passed if element is document and type is visibilitychange',
    () => {
      const element = document;
      vi.spyOn(element, 'addEventListener');

      const type = 'visibilitychange';
      const listener = (_event: Event) => {
        // Intentionally empty
      };

      renderHook(() => useEventListener(element, type, listener));
    },
  );
});
