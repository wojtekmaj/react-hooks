import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useOnLine from './useOnLine';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

describe('useOnLine()', () => {
  itIfDocumentDefined('should return current browser online status properly', () => {
    const { result } = renderHook(() => useOnLine());

    expect(result.current).toBe(true);
  });

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useOnLine());

    expect(result.current).toBe(null);
  });
});
