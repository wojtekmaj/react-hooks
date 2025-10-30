import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useScrollTop from './useScrollTop.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useScrollTop()', () => {
  itIfWindowDefined('should return current scroll top position properly', async () => {
    const { result } = await renderHook(() => useScrollTop());

    expect(result.current).toBe(0);
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => useScrollTop());

    expect(result.current).toBe(null);
  });
});
