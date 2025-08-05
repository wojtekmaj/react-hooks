import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useMatchMedia from './useMatchMedia.js';
import usePrefersReducedTransparency from './usePrefersReducedTransparency.js';

vi.mock('./useMatchMedia.js', () => ({ default: vi.fn() }));

const mockedUseMatchMedia = vi.mocked(useMatchMedia);
mockedUseMatchMedia.mockReturnValue(true);

describe('usePrefersReducedTransparency()', () => {
  it('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersReducedTransparency());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-reduced-transparency: reduce)');
  });

  it('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersReducedTransparency());

    expect(result.current).toBe(true);
  });
});
