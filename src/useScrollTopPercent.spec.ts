import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useScrollTopPercent from './useScrollTopPercent';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

describe('useScrollTopPercent()', () => {
  itIfDocumentDefined('should return current scroll top percentage properly', () => {
    const { result } = renderHook(() => useScrollTopPercent());

    expect(result.current).toBe(0);
  });

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollTopPercent());

    expect(result.current).toBe(null);
  });
});
