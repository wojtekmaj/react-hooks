import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useScrollTopPercent from './useScrollTopPercent.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

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
