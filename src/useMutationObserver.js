import { useEffect } from 'react';

/**
 * Observes a given element using MutationObserver.
 *
 * @param {HTMLElement} element Element to attach MutationObserver to
 * @param {object} options MutationObserver options. WARNING! If you define the object in
 *   component body, make sure to memoize it.
 * @param {Function} observerCallback MutationObserver callback. WARNING! If you define
 *   the function in component body, make sure to memoize it.
 */
export default function useMutationObserver(element, options, observerCallback) {
  useEffect(() => {
    if (!element || !('MutationObserver' in window)) {
      return undefined;
    }

    const observer = new MutationObserver(observerCallback);

    observer.observe(element, options);

    return () => {
      observer.disconnect();
    };
  }, [element, options, observerCallback]);
}
