import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import usePrefersColorScheme from './usePrefersColorScheme.js';

import type { Mock } from 'vitest';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('usePrefersColorScheme()', () => {
  let matches: boolean;
  let addEventListener: Mock;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      matches = false;
      addEventListener = vi.fn();

      window.matchMedia = vi.fn().mockReturnValue({
        get matches() {
          return matches;
        },
        addEventListener,
        removeEventListener: vi.fn(),
      });
    }
  });

  itIfWindowDefined.each([
    { matches: false, preference: 'dark' },
    { matches: true, preference: 'light' },
  ] as const)('returns $preference initially', async ({ matches: initialMatches, preference }) => {
    matches = initialMatches;

    const { result } = await renderHook(() => usePrefersColorScheme());

    expect(result.current).toBe(preference);
  });

  itIfWindowDefined('updates when the media query changes', async () => {
    matches = false;
    let listener: EventListener;
    addEventListener.mockImplementationOnce((_type, currentListener) => {
      listener = currentListener;
    });

    const { result } = await renderHook(() => usePrefersColorScheme());

    act(() => {
      matches = true;
      listener(new MediaQueryListEvent('change', { matches }));
    });

    expect(result.current).toBe('light');
  });

  itIfWindowUndefined('returns null during server-side rendering', async () => {
    const { result } = await renderHook(() => usePrefersColorScheme());

    expect(result.current).toBe(null);
  });
});
