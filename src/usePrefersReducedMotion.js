import useMatchMedia from './useMatchMedia';

/**
 * Returns a flag which determines if the document matches `(prefers-reduced-motion: reduce)` media
 * feature.
 *
 * @returns {boolean} Whether the document matches `(prefers-reduced-motion: reduce)` media feature
 */
export default function usePrefersReducedMotion() {
  return useMatchMedia('(prefers-reduced-motion: reduce)');
}
