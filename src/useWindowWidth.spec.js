import { renderHook } from '@testing-library/react-hooks';

import useWindowWidth from './useWindowWidth';

const itIfWindowDefined = typeof window !== 'undefined' ? it : it.skip;
const itIfWindowUndefined = typeof window === 'undefined' ? it : it.skip;

describe('useWindowWidth()', () => {
  itIfWindowDefined('should return window.innerWidth by default', () => {
    const { result } = renderHook(() => useWindowWidth());

    expect(result.current).toBe(window.innerWidth);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useWindowWidth());

    expect(result.current).toBe(null);
  });
});
