import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useWindowWidth from './useWindowWidth.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useWindowWidth()', () => {
  itIfWindowDefined('should return window.innerWidth by default', async () => {
    const { result } = await renderHook(() => useWindowWidth());

    expect(result.current).toBe(window.innerWidth);
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => useWindowWidth());

    expect(result.current).toBe(null);
  });
});
