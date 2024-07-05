import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useScrollLeftDirection from './useScrollLeftDirection.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

describe('useScrollLeftDirection()', () => {
  itIfDocumentDefined('should return "still"', () => {
    const { result } = renderHook(() => useScrollLeftDirection());

    expect(result.current).toBe('still');
  });

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollLeftDirection());

    expect(result.current).toBe(null);
  });
});
