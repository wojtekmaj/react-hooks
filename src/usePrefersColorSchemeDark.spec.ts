import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import usePrefersColorSchemeDark from './usePrefersColorSchemeDark.js';
import useMatchMedia from './useMatchMedia.js';

vi.mock('./useMatchMedia.js', () => ({ default: vi.fn() }));

const mockedUseMatchMedia = vi.mocked(useMatchMedia);
mockedUseMatchMedia.mockReturnValue(true);

describe('usePrefersColorSchemeDark()', () => {
  it('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersColorSchemeDark());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
  });

  it('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersColorSchemeDark());

    expect(result.current).toBe(true);
  });
});
