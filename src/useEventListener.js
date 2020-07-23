import { useEffect } from 'react';

/**
 * Adds event listener to a given element.
 *
 * @param {HTMLElement} element Element to attach the listener to
 * @param {string} type Event type
 * @param {Function} listener Event listener
 */
export default function useEventListener(element, type, listener) {
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
