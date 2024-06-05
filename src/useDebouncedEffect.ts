import { useEffect } from 'react';

import type { DependencyList, EffectCallback } from 'react';

/**
 * Runs a given effect after a given delay.
 *
 * @param {EffectCallback} effect The effect to run
 * @param {DependencyList} deps The dependencies to watch
 * @param {number} [debounceTime=250] The delay to wait before running the effect
 * @returns {void}
 */
export default function useDebouncedEffect(
  effect: EffectCallback,
  deps: DependencyList,
  debounceTime = 250,
): void {
  // biome-ignore lint/correctness/useExhaustiveDependencies: Ommitted debounceTime so it is not called every time it changes
  useEffect(() => {
    let cleanup: ReturnType<EffectCallback>;

    const timeout = setTimeout(() => {
      cleanup = effect();
    }, debounceTime);

    return () => {
      clearTimeout(timeout);

      if (cleanup) {
        cleanup();
      }
    };
  }, deps);
}
