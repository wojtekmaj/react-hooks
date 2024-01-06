import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useOnLine from './useOnLine.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

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
