import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useMatchMedia from './useMatchMedia.js';
import usePrefersColorSchemeLight from './usePrefersColorSchemeLight.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

vi.mock('./useMatchMedia.js', { spy: true });

describe('usePrefersColorSchemeLight()', () => {
  itIfWindowDefined('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersColorSchemeLight());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: light)');
  });

  itIfWindowDefined('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersColorSchemeLight());

    expect(result.current).toBe(false);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => usePrefersColorSchemeLight());

    expect(result.current).toBe(null);
  });
});
