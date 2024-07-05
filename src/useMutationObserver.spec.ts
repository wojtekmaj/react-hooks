import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useMutationObserver from './useMutationObserver.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

async function waitForAsync() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('useMutationObserver()', () => {
  const config = {
    childList: true,
    subtree: true,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing given falsy element', () => {
    const listener = () => {
      // Intentionally empty
    };

    const { result } = renderHook(() => useMutationObserver(null, config, listener));

    expect(result.current).toBe(undefined);
  });

  itIfWindowDefined('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = vi.fn();

    renderHook(() => useMutationObserver(element, config, listener));

    element.appendChild(document.createElement('span'));

    await waitForAsync();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(
      [expect.any(MutationRecord)],
      expect.any(MutationObserver),
    );
  });
});
