import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useOnLine from './useOnLine.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useOnLine()', () => {
  itIfWindowDefined('should return current browser online status properly', async () => {
    const { result } = await renderHook(() => useOnLine());

    expect(result.current).toBe(true);
  });

  itIfWindowUndefined('should return null', async () => {
    const { result } = await renderHook(() => useOnLine());

    expect(result.current).toBe(null);
  });
});
