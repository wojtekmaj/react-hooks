import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useScrollLeft from './useScrollLeft.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useScrollLeft()', () => {
  itIfWindowDefined('should return current scroll left position properly', async () => {
    const { result } = await renderHook(() => useScrollLeft());

    expect(result.current).toBe(0);
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => useScrollLeft());

    expect(result.current).toBe(null);
  });
});
