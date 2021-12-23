import { renderHook } from '@testing-library/react-hooks';

import useWindowHeight from './useWindowHeight';

const itIfWindowDefined = typeof window !== 'undefined' ? it : it.skip;
const itIfWindowUndefined = typeof window === 'undefined' ? it : it.skip;

describe('useWindowHeight()', () => {
  itIfWindowDefined('should return window.innerHeight by default', () => {
    const { result } = renderHook(() => useWindowHeight());

    expect(result.current).toBe(window.innerHeight);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useWindowHeight());

    expect(result.current).toBe(null);
  });
});
