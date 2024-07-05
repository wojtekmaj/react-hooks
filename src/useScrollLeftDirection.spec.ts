import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useScrollLeftDirection from './useScrollLeftDirection.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useScrollLeftDirection()', () => {
  itIfWindowDefined('should return "still"', () => {
    const { result } = renderHook(() => useScrollLeftDirection());

    expect(result.current).toBe('still');
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollLeftDirection());

    expect(result.current).toBe(null);
  });
});
