import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useScrollLeftPercent from './useScrollLeftPercent.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useScrollLeftPercent()', () => {
  itIfWindowDefined('should return current scroll left percentage properly', () => {
    const { result } = renderHook(() => useScrollLeftPercent());

    expect(result.current).toBe(0);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollLeftPercent());

    expect(result.current).toBe(null);
  });
});
