import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useMatchMedia from './useMatchMedia.js';
import usePrefersColorSchemeDark from './usePrefersColorSchemeDark.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

vi.mock('./useMatchMedia.js', { spy: true });

describe('usePrefersColorSchemeDark()', () => {
  itIfWindowDefined('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersColorSchemeDark());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
  });

  itIfWindowDefined('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersColorSchemeDark());

    expect(result.current).toBe(true);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => usePrefersColorSchemeDark());

    expect(result.current).toBe(null);
  });
});
