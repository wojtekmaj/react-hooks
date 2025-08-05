import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useMatchMedia from './useMatchMedia.js';
import usePrefersColorSchemeLight from './usePrefersColorSchemeLight.js';

vi.mock('./useMatchMedia.js', () => ({ default: vi.fn() }));

const mockedUseMatchMedia = vi.mocked(useMatchMedia);
mockedUseMatchMedia.mockReturnValue(true);

describe('usePrefersColorSchemeLight()', () => {
  it('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersColorSchemeLight());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: light)');
  });

  it('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersColorSchemeLight());

    expect(result.current).toBe(true);
  });
});
