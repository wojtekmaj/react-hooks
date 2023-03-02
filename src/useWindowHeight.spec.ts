import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useWindowHeight from './useWindowHeight';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;
const itIfDocumentUndefined = typeof document === 'undefined' ? it : it.skip;

describe('useWindowHeight()', () => {
  itIfDocumentDefined('should return window.innerHeight by default', () => {
    const { result } = renderHook(() => useWindowHeight());

    expect(result.current).toBe(window.innerHeight);
  });

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useWindowHeight());

    expect(result.current).toBe(null);
  });
});
