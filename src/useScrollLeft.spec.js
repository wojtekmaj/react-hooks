import { renderHook } from '@testing-library/react-hooks';

import useScrollLeft from './useScrollLeft';

const itIfWindowDefined = typeof window !== 'undefined' ? it : it.skip;
const itIfWindowUndefined = typeof window === 'undefined' ? it : it.skip;

describe('useScrollLeft()', () => {
  itIfWindowDefined('should return current scroll left position properly', () => {
    const { result } = renderHook(() => useScrollLeft());

    expect(result.current).toBe(0);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useScrollLeft());

    expect(result.current).toBe(null);
  });
});
