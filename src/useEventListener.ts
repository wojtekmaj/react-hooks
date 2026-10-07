import { useEffect } from 'react';

/**
 * Adds event listener to a given element.
 *
 * Event type is inferred from the element's event map (e.g. `HTMLElementEventMap`,
 * `SVGElementEventMap`, `WindowEventMap`) when possible. Unknown event types fall back to
 * `Event`.
 *
 * @param {Element | Window | Document | FontFaceSet | null} [element] Element to attach the listener to
 * @param {string} type Event type
 * @param {EventListenerOrEventListenerObject} listener Event listener
 * @returns {void}
 */
export default function useEventListener<U extends keyof HTMLElementEventMap>(
  element: HTMLElement | null,
  type: U,
  listener: (event: HTMLElementEventMap[U]) => void,
): void;
export default function useEventListener<U extends keyof SVGElementEventMap>(
  element: SVGElement | null,
  type: U,
  listener: (event: SVGElementEventMap[U]) => void,
): void;
export default function useEventListener<U extends keyof ElementEventMap>(
  element: Element | null,
  type: U,
  listener: (event: ElementEventMap[U]) => void,
): void;
export default function useEventListener(
  element: Element | null,
  type: string,
  listener: EventListenerOrEventListenerObject,
): void;
export default function useEventListener<U extends keyof WindowEventMap>(
  element: Window | null,
  type: U,
  listener: (event: WindowEventMap[U]) => void,
): void;
export default function useEventListener<U extends keyof DocumentEventMap>(
  element: Document | null,
  type: U,
  listener: (event: DocumentEventMap[U]) => void,
): void;
export default function useEventListener<U extends keyof FontFaceSetEventMap>(
  element: FontFaceSet | null,
  type: U,
  listener: (event: FontFaceSetEventMap[U]) => void,
): void;
export default function useEventListener(
  element: Element | Window | Document | FontFaceSet | null,
  type: string,
  listener: EventListenerOrEventListenerObject | ((event: Event) => void),
): void {
  useEffect(() => {
    if (!element) {
      return undefined;
    }

    element.addEventListener(type, listener);

    return () => {
      element.removeEventListener(type, listener);
    };
  }, [element, type, listener]);
}
