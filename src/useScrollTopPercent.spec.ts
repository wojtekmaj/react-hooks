import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useScrollTopPercent from './useScrollTopPercent.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useScrollTopPercent()', () => {
  itIfWindowDefined('should return current scroll top percentage properly', () => {
    const { result } = renderHook(() => useScrollTopPercent());

    expect(result.current).toBe(0);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollTopPercent());

    expect(result.current).toBe(null);
  });
});
