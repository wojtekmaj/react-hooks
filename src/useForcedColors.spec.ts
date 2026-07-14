import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useForcedColors from './useForcedColors.js';
import useMatchMedia from './useMatchMedia.js';

vi.mock('/src/useMatchMedia.ts', () => ({
  default: vi.fn(),
}));

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');
const itIfWindowUndefined = it.runIf(typeof window === 'undefined');

describe('useForcedColors()', () => {
  beforeEach(() => {
    vi.mocked(useMatchMedia).mockReset();
  });

  itIfWindowDefined('calls useMatchMedia with correct query', async () => {
    vi.mocked(useMatchMedia).mockReturnValue(false);

    await renderHook(() => useForcedColors());

    expect(useMatchMedia).toHaveBeenCalledWith('(forced-colors: active)');
  });

  itIfWindowDefined.each([false, true])('returns useMatchMedia result properly', async (active) => {
    vi.mocked(useMatchMedia).mockReturnValue(active);

    const { result } = await renderHook(() => useForcedColors());

    expect(result.current).toBe(active);
  });

  itIfWindowUndefined('should return null', async () => {
    vi.mocked(useMatchMedia).mockReturnValue(null);

    const { result } = await renderHook(() => useForcedColors());

    expect(result.current).toBe(null);
  });
});
