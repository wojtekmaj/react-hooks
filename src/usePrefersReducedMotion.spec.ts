import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useMatchMedia from './useMatchMedia.js';
import usePrefersReducedMotion from './usePrefersReducedMotion.js';

vi.mock('./useMatchMedia.js', () => ({ default: vi.fn() }));

const mockedUseMatchMedia = vi.mocked(useMatchMedia);
mockedUseMatchMedia.mockReturnValue(true);

describe('usePrefersReducedMotion()', () => {
  it('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersReducedMotion());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  it('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });
});
