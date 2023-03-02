import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useScrollLeftPercent from './useScrollLeftPercent';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

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
