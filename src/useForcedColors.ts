import useMatchMedia from './useMatchMedia.js';

/**
 * Returns a flag which determines if the document matches `(forced-colors: active)` media feature.
 *
 * @returns {boolean | null} Whether the document matches `(forced-colors: active)` media feature
 */
export default function useForcedColors(): boolean | null {
  return useMatchMedia('(forced-colors: active)');
}
