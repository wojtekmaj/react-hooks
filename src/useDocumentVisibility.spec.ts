import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';

import useDocumentVisibility from './useDocumentVisibility.js';

const itIfDocumentDefined = it.runIf(typeof document !== 'undefined');
const itIfDocumentUndefined = it.runIf(typeof document === 'undefined');

describe('useDocumentVisibility()', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  itIfDocumentDefined('should return document.visibilityState initially', async () => {
    const { result } = await renderHook(() => useDocumentVisibility());

    expect(result.current).toBe(document.visibilityState);
  });

  itIfDocumentDefined('should update when document visibility changes', async () => {
    let visibilityState: DocumentVisibilityState = 'visible';

    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibilityState);

    const { result } = await renderHook(() => useDocumentVisibility());

    expect(result.current).toBe('visible');

    act(() => {
      visibilityState = 'hidden';
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe('hidden');
  });

  itIfDocumentDefined('should remove the visibility listener on unmount', async () => {
    const removeEventListener = vi.spyOn(document, 'removeEventListener');

    const { unmount } = await renderHook(() => useDocumentVisibility());

    expect(removeEventListener).not.toHaveBeenCalled();

    await unmount();

    expect(removeEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });

  itIfDocumentUndefined('should return null', async () => {
    const { result } = await renderHook(() => useDocumentVisibility());

    expect(result.current).toBe(null);
  });
});
