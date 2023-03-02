import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useEventListener from './useEventListener';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

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
});
