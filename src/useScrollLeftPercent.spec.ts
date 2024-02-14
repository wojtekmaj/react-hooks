import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useScrollLeftPercent from './useScrollLeftPercent.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

describe('useScrollLeftPercent()', () => {
  itIfDocumentDefined('should return current scroll left percentage properly', () => {
    const { result } = renderHook(() => useScrollLeftPercent());

    expect(result.current).toBe(0);
  });

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollLeftPercent());

    expect(result.current).toBe(null);
  });
});
