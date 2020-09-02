import { renderHook } from '@testing-library/react-hooks';

import useScrollLeft from './useScrollLeft';

describe('useScrollLeft()', () => {
  it('returns current scroll left position properly', () => {
    const { result } = renderHook(() => useScrollLeft());

    expect(result.current).toBe(0);
  });
});
