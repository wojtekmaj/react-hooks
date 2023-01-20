import useMatchMedia from './useMatchMedia';

/**
 * Returns a flag which determines if the document matches `(prefers-color-scheme: light)` media
 * feature.
 *
 * @returns {boolean} Whether the document matches `(prefers-color-scheme: light)` media feature
 */
export default function usePrefersColorSchemeLight(): boolean | null {
  return useMatchMedia('(prefers-color-scheme: light)');
}
