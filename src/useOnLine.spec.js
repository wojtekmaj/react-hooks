import { renderHook } from '@testing-library/react-hooks';

import useOnLine from './useOnLine';

const itIfWindowDefined = typeof window !== 'undefined' ? it : it.skip;
const itIfWindowUndefined = typeof window === 'undefined' ? it : it.skip;

describe('useOnLine()', () => {
  itIfWindowDefined('should return current browser online status properly', () => {
    const { result } = renderHook(() => useOnLine());

    expect(result.current).toBe(true);
  });

  itIfWindowUndefined('should return null', () => {
    const { result } = renderHook(() => useOnLine());

    expect(result.current).toBe(null);
  });
});
