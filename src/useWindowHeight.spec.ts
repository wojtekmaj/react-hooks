import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useWindowHeight from './useWindowHeight.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useWindowHeight()', () => {
  itIfWindowDefined('should return window.innerHeight by default', async () => {
    const { result } = await renderHook(() => useWindowHeight());

    expect(result.current).toBe(window.innerHeight);
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => useWindowHeight());

    expect(result.current).toBe(null);
  });
});
