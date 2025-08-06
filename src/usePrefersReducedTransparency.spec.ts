import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useMatchMedia from './useMatchMedia.js';
import usePrefersReducedTransparency from './usePrefersReducedTransparency.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

vi.mock('./useMatchMedia.js', { spy: true });

describe('usePrefersReducedTransparency()', () => {
  itIfWindowDefined('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersReducedTransparency());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-reduced-transparency: reduce)');
  });

  itIfWindowDefined('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersReducedTransparency());

    expect(result.current).toBe(true);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => usePrefersReducedTransparency());

    expect(result.current).toBe(null);
  });
});
