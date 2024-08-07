import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useOnLine from './useOnLine.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useOnLine()', () => {
  itIfWindowDefined('should return current browser online status properly', () => {
    const { result } = renderHook(() => useOnLine());

    expect(result.current).toBe(true);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useOnLine());

    expect(result.current).toBe(null);
  });
});
