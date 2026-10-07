import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import useEventListener from './useEventListener.js';

const itIfWindowDefined = it.runIf(typeof window !== 'undefined');

describe('useEventListener()', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing given falsy element', async () => {
    const type = 'click';
    const listener = () => {
      // Intentionally empty
    };

    const { result } = await renderHook(() => useEventListener(null, type, listener));

    expect(result.current).toBe(undefined);
  });

  itIfWindowDefined('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    vi.spyOn(element, 'addEventListener');

    const type = 'click';
    const listener = () => {
      // Intentionally empty
    };

    await renderHook(() => useEventListener(element, type, listener));

    expect(element.addEventListener).toHaveBeenCalledTimes(1);
    expect(element.addEventListener).toHaveBeenCalledWith(type, listener);
  });

  itIfWindowDefined(
    'should allow storage handler to be passed if element is window and type is storage',
    async () => {
      const element = window;
      vi.spyOn(element, 'addEventListener');

      const type = 'storage';
      const listener = (_event: StorageEvent) => {
        // Intentionally empty
      };

      await renderHook(() => useEventListener(element, type, listener));
    },
  );

  itIfWindowDefined(
    'should allow storage handler to be passed if element is document and type is visibilitychange',
    async () => {
      const element = document;
      vi.spyOn(element, 'addEventListener');

      const type = 'visibilitychange';
      const listener = (_event: Event) => {
        // Intentionally empty
      };

      await renderHook(() => useEventListener(element, type, listener));
    },
  );

  describe('types', () => {
    it('infers DragEvent for HTMLElement and dragstart', async () => {
      const element = null as HTMLElement | null;

      await renderHook(() =>
        useEventListener(element, 'dragstart', (event) => {
          expectTypeOf(event).toEqualTypeOf<DragEvent>();
        }),
      );
    });

    it('accepts DragEvent handler for HTMLElement and dragstart', async () => {
      const element = null as HTMLDivElement | null;
      const listener = (_event: DragEvent) => {
        // Intentionally empty
      };

      await renderHook(() => useEventListener(element, 'dragstart', listener));
    });

    it('infers PointerEvent for HTMLElement and click', async () => {
      const element = null as HTMLElement | null;

      await renderHook(() =>
        useEventListener(element, 'click', (event) => {
          expectTypeOf(event).toEqualTypeOf<PointerEvent>();
        }),
      );
    });

    it('infers MouseEvent for HTMLElement and mousedown', async () => {
      const element = null as HTMLElement | null;

      await renderHook(() =>
        useEventListener(element, 'mousedown', (event) => {
          expectTypeOf(event).toEqualTypeOf<MouseEvent>();
        }),
      );
    });

    it('infers KeyboardEvent for HTMLElement and keydown', async () => {
      const element = null as HTMLInputElement | null;

      await renderHook(() =>
        useEventListener(element, 'keydown', (event) => {
          expectTypeOf(event).toEqualTypeOf<KeyboardEvent>();
        }),
      );
    });

    it('rejects mismatched handler for HTMLElement', async () => {
      const element = null as HTMLElement | null;
      const listener = (_event: DragEvent) => {
        // Intentionally empty
      };

      // @ts-expect-error DragEvent handler cannot handle keydown
      await renderHook(() => useEventListener(element, 'keydown', listener));
    });

    it('infers event type for SVGElement', async () => {
      const element = null as SVGSVGElement | null;

      await renderHook(() =>
        useEventListener(element, 'pointerdown', (event) => {
          expectTypeOf(event).toEqualTypeOf<PointerEvent>();
        }),
      );
    });

    it('infers event type for Element', async () => {
      const element = null as Element | null;

      await renderHook(() =>
        useEventListener(element, 'fullscreenchange', (event) => {
          expectTypeOf(event).toEqualTypeOf<Event>();
        }),
      );
    });

    it('falls back to Event for custom event types', async () => {
      const element = null as HTMLElement | null;

      await renderHook(() =>
        useEventListener(element, 'my-custom-event', (event) => {
          expectTypeOf(event).toEqualTypeOf<Event>();
        }),
      );
    });

    it('accepts listener objects', async () => {
      const element = null as HTMLElement | null;
      const listener = {
        handleEvent: (_event: Event) => {
          // Intentionally empty
        },
      };

      await renderHook(() => useEventListener(element, 'click', listener));
    });

    it('accepts null element', async () => {
      await renderHook(() =>
        useEventListener(null, 'click', (event) => {
          expectTypeOf(event).toEqualTypeOf<PointerEvent>();
        }),
      );
    });

    it('infers event type for Window', async () => {
      const element = null as Window | null;

      await renderHook(() =>
        useEventListener(element, 'storage', (event) => {
          expectTypeOf(event).toEqualTypeOf<StorageEvent>();
        }),
      );
    });

    it('infers event type for Document', async () => {
      const element = null as Document | null;

      await renderHook(() =>
        useEventListener(element, 'visibilitychange', (event) => {
          expectTypeOf(event).toEqualTypeOf<Event>();
        }),
      );
    });

    it('infers event type for FontFaceSet', async () => {
      const element = null as FontFaceSet | null;

      await renderHook(() =>
        useEventListener(element, 'loadingdone', (event) => {
          expectTypeOf(event).toEqualTypeOf<FontFaceSetLoadEvent>();
        }),
      );
    });
  });
});
