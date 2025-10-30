import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import usePrefersReducedMotion from './usePrefersReducedMotion.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('usePrefersReducedMotion()', () => {
  itIfWindowDefined('returns useMatchMedia result propperly', async () => {
    const { result } = await renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(null);
  });
});
