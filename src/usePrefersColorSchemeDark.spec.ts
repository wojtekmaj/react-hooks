import { renderHook } from '@testing-library/react-hooks';

import usePrefersColorSchemeDark from './usePrefersColorSchemeDark';
import useMatchMedia from './useMatchMedia';

jest.mock('./useMatchMedia', () => jest.fn());

const mockedUseMatchMedia = jest.mocked(useMatchMedia);
mockedUseMatchMedia.mockReturnValue(true);

describe('usePrefersColorSchemeDark()', () => {
  it('should call useMatchMedia properly', () => {
    renderHook(() => usePrefersColorSchemeDark());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
  });

  it('returns useMatchMedia result propperly', () => {
    const { result } = renderHook(() => usePrefersColorSchemeDark());

    expect(result.current).toBe(true);
  });
});
