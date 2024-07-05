import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useWindowHeight from './useWindowHeight.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useWindowHeight()', () => {
  itIfWindowDefined('should return window.innerHeight by default', () => {
    const { result } = renderHook(() => useWindowHeight());

    expect(result.current).toBe(window.innerHeight);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useWindowHeight());

    expect(result.current).toBe(null);
  });
});
