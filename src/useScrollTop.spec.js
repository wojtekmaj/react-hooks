import { renderHook } from '@testing-library/react-hooks';

import useScrollTop from './useScrollTop';

const itIfWindowDefined = typeof window !== 'undefined' ? it : it.skip;
const itIfWindowUndefined = typeof window === 'undefined' ? it : it.skip;

describe('useScrollTop()', () => {
  itIfWindowDefined('should return current scroll top position properly', () => {
    const { result } = renderHook(() => useScrollTop());

    expect(result.current).toBe(0);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollTop());

    expect(result.current).toBe(null);
  });
});
