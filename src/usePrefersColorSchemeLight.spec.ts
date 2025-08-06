import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import usePrefersColorSchemeLight from './usePrefersColorSchemeLight.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('usePrefersColorSchemeLight()', () => {
  itIfWindowDefined('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersColorSchemeLight());

    expect(result.current).toBe(false);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => usePrefersColorSchemeLight());

    expect(result.current).toBe(null);
  });
});
