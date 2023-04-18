import { useEffect } from 'react';

/**
 * Adds event listener to a given element.
 *
 * @param {Element | Window | Document} [element] Element to attach the listener to
 * @param {string} type Event type
 * @param {EventListenerOrEventListenerObject} listener Event listener
 * @returns {void}
 */
export default function useEventListener(
  element: Element | null,
  type: string,
  listener: EventListenerOrEventListenerObject,
): void;
export default function useEventListener<U extends keyof WindowEventHandlersEventMap>(
  element: Window | null,
  type: U,
  listener: (event: WindowEventHandlersEventMap[U]) => void,
): void;
export default function useEventListener<U extends keyof DocumentEventMap>(
  element: Document | null,
  type: U,
  listener: (event: DocumentEventMap[U]) => void,
): void;
export default function useEventListener(
  element: Element | Window | Document | null,
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
