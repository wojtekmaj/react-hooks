import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useScrollTopDirection from './useScrollTopDirection.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

describe('useScrollTopDirection()', () => {
  itIfDocumentDefined('should return "still"', () => {
    const { result } = renderHook(() => useScrollTopDirection());

    expect(result.current).toBe('still');
  });

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollTopDirection());

    expect(result.current).toBe(null);
  });
});
