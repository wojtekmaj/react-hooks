import { renderHook } from '@testing-library/react-hooks';

import usePrefersReducedMotion from './usePrefersReducedMotion';
import useMatchMedia from './useMatchMedia';

jest.mock('./useMatchMedia', () => jest.fn());

useMatchMedia.mockReturnValue(true);

describe('usePrefersReducedMotion()', () => {
  it('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersReducedMotion());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  it('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });
});
