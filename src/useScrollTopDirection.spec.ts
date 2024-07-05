import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useScrollTopDirection from './useScrollTopDirection.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useScrollTopDirection()', () => {
  itIfWindowDefined('should return "still"', () => {
    const { result } = renderHook(() => useScrollTopDirection());

    expect(result.current).toBe('still');
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollTopDirection());

    expect(result.current).toBe(null);
  });
});
