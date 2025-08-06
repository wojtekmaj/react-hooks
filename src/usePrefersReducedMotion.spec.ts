import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import usePrefersReducedMotion from './usePrefersReducedMotion.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('usePrefersReducedMotion()', () => {
  itIfWindowDefined('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(null);
  });
});
