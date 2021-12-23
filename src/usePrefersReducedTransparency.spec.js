import { renderHook } from '@testing-library/react-hooks';

import usePrefersReducedTransparency from './usePrefersReducedTransparency';
import useMatchMedia from './useMatchMedia';

jest.mock('./useMatchMedia', () => jest.fn());

useMatchMedia.mockReturnValue(true);

describe('usePrefersReducedTransparency()', () => {
  it('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersReducedTransparency());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-reduced-transparency: reduce)');
  });

  it('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersReducedTransparency());

    expect(result.current).toBe(true);
  });
});
