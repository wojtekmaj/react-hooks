import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useScrollTop from './useScrollTop.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

describe('useScrollTop()', () => {
  itIfDocumentDefined('should return current scroll top position properly', () => {
    const { result } = renderHook(() => useScrollTop());

    expect(result.current).toBe(0);
  });

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollTop());

    expect(result.current).toBe(null);
  });
});
