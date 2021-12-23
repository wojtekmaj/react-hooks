import { renderHook } from '@testing-library/react-hooks';

import usePrefersColorSchemeLight from './usePrefersColorSchemeLight';
import useMatchMedia from './useMatchMedia';

jest.mock('./useMatchMedia', () => jest.fn());

useMatchMedia.mockReturnValue(true);

describe('usePrefersColorSchemeLight()', () => {
  it('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersColorSchemeLight());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: light)');
  });

  it('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersColorSchemeLight());

    expect(result.current).toBe(true);
  });
});
