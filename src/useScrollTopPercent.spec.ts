import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useScrollTopPercent from './useScrollTopPercent.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useScrollTopPercent()', () => {
  itIfWindowDefined('should return current scroll top percentage properly', async () => {
    const { result } = await renderHook(() => useScrollTopPercent());

    expect(result.current).toBe(0);
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => useScrollTopPercent());

    expect(result.current).toBe(null);
  });
});
