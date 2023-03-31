import { useEffect } from 'react';

/**
 * Observes a given element using MutationObserver.
 *
 * @param {Node} [element] Element to attach MutationObserver to
 * @param {MutationObserverInit} [options] MutationObserver options. WARNING! If you define the
 *   object in component body, make sure to memoize it.
 * @param {MutationCallback} observerCallback MutationObserver callback. WARNING! If you define the
 *   function in component body, make sure to memoize it.
 * @returns {void}
 */
export default function useMutationObserver(
  element: Node | null,
  options: MutationObserverInit,
  observerCallback: MutationCallback,
): void {
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
