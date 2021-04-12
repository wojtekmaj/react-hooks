import { renderHook } from '@testing-library/react-hooks';

import useOnLine from './useOnLine';

describe('useOnLine()', () => {
  it('returns current browser online status properly', () => {
    const { result } = renderHook(() => useOnLine());

    expect(result.current).toBe(true);
  });
});
