import { renderHook } from '@testing-library/react-hooks';

import useScrollTop from './useScrollTop';

describe('useScrollTop()', () => {
  it('returns current scroll top position properly', () => {
    const { result } = renderHook(() => useScrollTop());

    expect(result.current).toBe(0);
  });
});
