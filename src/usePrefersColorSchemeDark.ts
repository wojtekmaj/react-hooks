import useMatchMedia from './useMatchMedia';

/**
 * Returns a flag which determines if the document matches `(prefers-color-scheme: dark)` media
 * feature.
 *
 * @returns {boolean} Whether the document matches `(prefers-color-scheme: dark)` media feature
 */
export default function usePrefersColorSchemeDark(): boolean | null {
  return useMatchMedia('(prefers-color-scheme: dark)');
}
