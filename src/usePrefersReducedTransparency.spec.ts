import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import usePrefersReducedTransparency from './usePrefersReducedTransparency.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('usePrefersReducedTransparency()', () => {
  itIfWindowDefined('returns useMatchMedia result propperly', async () => {
    const { result } = await renderHook(() => usePrefersReducedTransparency());

    /**
     * As this feature is currently experimental and not supported in Playwright, we test against
     * `false` as the expected default value.
     *
     * See https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency
     */
    expect(result.current).toBe(false);
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => usePrefersReducedTransparency());

    expect(result.current).toBe(null);
  });
});
