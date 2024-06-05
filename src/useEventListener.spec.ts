import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useEventListener from './useEventListener.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');

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

  itIfDocumentDefined('attaches event listener to element properly', () => {
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

  itIfDocumentDefined(
    'should allow storage handler to be passed if element is window and type is storage',
    () => {
      const element = window;
      vi.spyOn(element, 'addEventListener');

      const type = 'storage';
      const listener = (event: StorageEvent) => {
        // Intentionally empty
      };

      renderHook(() => useEventListener(element, type, listener));
    },
  );

  itIfDocumentDefined(
    'should allow storage handler to be passed if element is document and type is visibilitychange',
    () => {
      const element = document;
      vi.spyOn(element, 'addEventListener');

      const type = 'visibilitychange';
      const listener = (event: Event) => {
        // Intentionally empty
      };

      renderHook(() => useEventListener(element, type, listener));
    },
  );
});
