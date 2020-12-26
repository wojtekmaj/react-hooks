import { renderHook } from '@testing-library/react-hooks';

import useWindowHeight from './useWindowHeight';

describe('useWindowHeight()', () => {
  it('should return window.innerHeight by default', () => {
    const { result } = renderHook(() => useWindowHeight());

    expect(result.current).toBe(window.innerHeight);
  });
});
