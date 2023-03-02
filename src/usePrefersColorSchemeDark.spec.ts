import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

import usePrefersColorSchemeDark from './usePrefersColorSchemeDark';
import useMatchMedia from './useMatchMedia';

vi.mock('./useMatchMedia', () => ({ default: vi.fn() }));

const mockedUseMatchMedia = vi.mocked(useMatchMedia);
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
