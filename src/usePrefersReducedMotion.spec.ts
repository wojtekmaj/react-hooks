import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useMatchMedia from './useMatchMedia.js';
import usePrefersReducedMotion from './usePrefersReducedMotion.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

vi.mock('./useMatchMedia.js', { spy: true });

describe('usePrefersReducedMotion()', () => {
  itIfWindowDefined('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersReducedMotion());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  itIfWindowDefined('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(null);
  });
});
