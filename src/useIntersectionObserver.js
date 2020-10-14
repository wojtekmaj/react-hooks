import { useEffect } from 'react';

/**
 * Observes a given element using IntersectionObserver.
 *
 * @param {HTMLElement} element Element to attach IntersectionObserver to
 * @param {object} options IntersectionObserver options. WARNING! If you define the object in
 *   component body, make sure to memoize it.
 * @param {Function} observerCallback IntersectionObserver callback. WARNING! If you define
 *   the function in component body, make sure to memoize it.
 */
export default function useIntersectionObserver(element, options, observerCallback) {
  useEffect(() => {
    if (!element || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(observerCallback, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, options, observerCallback]);
}
