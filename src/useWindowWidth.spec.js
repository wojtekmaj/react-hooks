import { renderHook } from '@testing-library/react-hooks';

import useWindowWidth from './useWindowWidth';

describe('useWindowWidth()', () => {
  it('should return window.innerWidth by default', () => {
    const { result } = renderHook(() => useWindowWidth());

    expect(result.current).toBe(window.innerWidth);
  });
});
