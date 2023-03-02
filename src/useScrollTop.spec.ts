import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useScrollTop from './useScrollTop';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

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
