import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useScrollTopDirection from './useScrollTopDirection.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useScrollTopDirection()', () => {
  itIfWindowDefined('should return "still"', async () => {
    const { result } = await renderHook(() => useScrollTopDirection());

    expect(result.current).toBe('still');
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => useScrollTopDirection());

    expect(result.current).toBe(null);
  });
});
