import { useEffect } from 'react';

/**
 * Observes a given element using ResizeObserver.
 *
 * @param {HTMLElement} element Element to attach ResizeObserver to
 * @param {object} options ResizeObserver options. WARNING! If you define the object in
 *   component body, make sure to memoize it.
 * @param {Function} observerCallback ResizeObserver callback. WARNING! If you define
 *   the function in component body, make sure to memoize it.
 */
export default function useResizeObserver(element, options, observerCallback) {
  useEffect(() => {
    if (!element || !('ResizeObserver' in window)) {
      return undefined;
    }

    const observer = new ResizeObserver(observerCallback);

    observer.observe(element, options);

    return () => {
      observer.disconnect();
    };
  }, [element, options, observerCallback]);
}
