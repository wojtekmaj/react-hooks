import useMatchMedia from './useMatchMedia';

/**
 * Returns a flag which determines if the document matches `(prefers-reduced-transparency: reduce)`
 * media feature.
 *
 * @returns {boolean} Whether the document matches `(prefers-reduced-transparency: reduce)` media
 *   feature
 */
export default function usePrefersReducedTransparency(): boolean | null {
  return useMatchMedia('(prefers-reduced-transparency: reduce)');
}
