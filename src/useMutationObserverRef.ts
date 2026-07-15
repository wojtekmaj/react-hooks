import { useCallback, useState } from 'react';

import useMutationObserver from './useMutationObserver.js';

import type { RefCallback } from 'react';

/**
 * Observes a node using MutationObserver and returns its latest records.
 *
 * @template T
 * @param {MutationObserverInit} options MutationObserver options. WARNING! If you define the
 *   object in component body, make sure to memoize it.
 * @returns {[React.RefCallback<T>, MutationRecord[] | null]} Ref callback and the latest
 *   MutationObserver records
 */
export default function useMutationObserverRef<T extends Node = HTMLElement>(
  options: MutationObserverInit,
): [RefCallback<T>, MutationRecord[] | null] {
  const [element, setElement] = useState<T | null>(null);
  const [records, setRecords] = useState<MutationRecord[] | null>(null);

  const ref = useCallback<RefCallback<T>>((nextElement) => {
    setElement(nextElement);
    setRecords(null);
  }, []);

  const observerCallback = useCallback<MutationCallback>((nextRecords) => {
    setRecords(nextRecords);
  }, []);

  useMutationObserver(element, options, observerCallback);

  return [ref, records];
}
