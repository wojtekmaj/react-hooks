import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useMatchMedia from './useMatchMedia.js';
import usePrefersContrast from './usePrefersContrast.js';

vi.mock('/src/useMatchMedia.ts', () => ({
  default: vi.fn(),
}));

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('usePrefersContrast()', () => {
  beforeEach(() => {
    vi.mocked(useMatchMedia).mockReset();
  });

  itIfWindowDefined('calls useMatchMedia with correct queries', async () => {
    vi.mocked(useMatchMedia).mockReturnValue(false);

    await renderHook(() => usePrefersContrast());

    expect(useMatchMedia).toHaveBeenCalledTimes(3);
    expect(useMatchMedia).toHaveBeenNthCalledWith(1, '(prefers-contrast: more)');
    expect(useMatchMedia).toHaveBeenNthCalledWith(2, '(prefers-contrast: less)');
    expect(useMatchMedia).toHaveBeenNthCalledWith(3, '(prefers-contrast: custom)');
  });

  itIfWindowDefined.each`
    matches                  | preference
    ${[true, false, false]}  | ${'more'}
    ${[false, true, false]}  | ${'less'}
    ${[false, false, true]}  | ${'custom'}
    ${[false, false, false]} | ${'no-preference'}
  `('returns useMatchMedia result properly', async ({ matches, preference }) => {
    for (const match of matches) {
      vi.mocked(useMatchMedia).mockReturnValueOnce(match);
    }

    const { result } = await renderHook(() => usePrefersContrast());

    expect(result.current).toBe(preference);
  });

  itIfWindowUndefined('should return null', async () => {
    vi.mocked(useMatchMedia).mockReturnValue(null);

    const { result } = await renderHook(() => usePrefersContrast());

    expect(result.current).toBe(null);
  });
});
