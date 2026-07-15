import { useCallback, useState } from 'react';

import useResizeObserver from './useResizeObserver.js';

import type { RefCallback } from 'react';

/**
 * Observes an element using ResizeObserver and returns its latest entry.
 *
 * @template T
 * @param {ResizeObserverOptions} [options] ResizeObserver options. WARNING! If you define the
 *   object in component body, make sure to memoize it.
 * @returns {[React.RefCallback<T>, ResizeObserverEntry | null]} Ref callback and the latest
 *   ResizeObserver entry
 */
export default function useResizeObserverRef<T extends Element = Element>(
  options?: ResizeObserverOptions,
): [RefCallback<T>, ResizeObserverEntry | null] {
  const [element, setElement] = useState<T | null>(null);
  const [entry, setEntry] = useState<ResizeObserverEntry | null>(null);

  const ref = useCallback<RefCallback<T>>((nextElement) => {
    setElement(nextElement);
    setEntry(null);
  }, []);

  const observerCallback = useCallback<ResizeObserverCallback>((entries) => {
    setEntry(entries[0] ?? null);
  }, []);

  useResizeObserver(element, options, observerCallback);

  return [ref, entry];
}
