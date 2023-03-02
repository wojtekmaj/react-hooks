import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useWindowWidth from './useWindowWidth';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

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
