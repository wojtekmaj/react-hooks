import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useWindowWidth from './useWindowWidth.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

describe('useWindowWidth()', () => {
  itIfDocumentDefined('should return window.innerWidth by default', () => {
    const { result } = renderHook(() => useWindowWidth());

    expect(result.current).toBe(window.innerWidth);
  });

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useWindowWidth());

    expect(result.current).toBe(null);
  });
});
