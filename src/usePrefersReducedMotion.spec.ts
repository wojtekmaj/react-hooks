import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useMatchMedia from './useMatchMedia.js';
import usePrefersReducedMotion from './usePrefersReducedMotion.js';

vi.mock('/src/useMatchMedia.ts', () => ({
  default: vi.fn(),
}));

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('usePrefersReducedMotion()', () => {
  beforeEach(() => {
    vi.mocked(useMatchMedia).mockReset();
  });

  itIfWindowDefined('calls useMatchMedia with correct query', async () => {
    vi.mocked(useMatchMedia).mockReturnValue(false);

    await renderHook(() => usePrefersReducedMotion());

    expect(useMatchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  itIfWindowDefined.each([false, true])(
    'returns useMatchMedia result properly',
    async (matches) => {
      vi.mocked(useMatchMedia).mockReturnValue(matches);

      const { result } = await renderHook(() => usePrefersReducedMotion());

      expect(result.current).toBe(matches);
    },
  );

  itIfWindowUndefined('should return null', async () => {
    vi.mocked(useMatchMedia).mockReturnValue(null);

    const { result } = await renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(null);
  });
});
