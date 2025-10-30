import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useScrollLeftDirection from './useScrollLeftDirection.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useScrollLeftDirection()', () => {
  itIfWindowDefined('should return "still"', async () => {
    const { result } = await renderHook(() => useScrollLeftDirection());

    expect(result.current).toBe('still');
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => useScrollLeftDirection());

    expect(result.current).toBe(null);
  });
});
