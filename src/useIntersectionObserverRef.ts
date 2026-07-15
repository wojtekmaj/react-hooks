import { useCallback, useState } from 'react';

import useIntersectionObserver from './useIntersectionObserver.js';

import type { RefCallback } from 'react';

/**
 * Observes an element using IntersectionObserver and returns its latest entry.
 *
 * @template T
 * @param {IntersectionObserverInit} [options] IntersectionObserver options. WARNING! If you define
 *   the object in component body, make sure to memoize it.
 * @returns {[React.RefCallback<T>, IntersectionObserverEntry | null]} Ref callback and the latest
 *   IntersectionObserver entry
 */
export default function useIntersectionObserverRef<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit,
): [RefCallback<T>, IntersectionObserverEntry | null] {
  const [element, setElement] = useState<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const ref = useCallback<RefCallback<T>>((nextElement) => {
    setElement(nextElement);
    setEntry(null);
  }, []);

  const observerCallback = useCallback<IntersectionObserverCallback>((entries) => {
    setEntry(entries[0] ?? null);
  }, []);

  useIntersectionObserver(element, options, observerCallback);

  return [ref, entry];
}
