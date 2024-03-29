import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useScrollLeft from './useScrollLeft.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

describe('useScrollLeft()', () => {
  itIfDocumentDefined('should return current scroll left position properly', () => {
    const { result } = renderHook(() => useScrollLeft());

    expect(result.current).toBe(0);
  });

  itIfDocumentUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollLeft());

    expect(result.current).toBe(null);
  });
});
