import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import useWindowHeight from './useWindowHeight.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

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
