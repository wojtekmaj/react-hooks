import useMatchMedia from './useMatchMedia.js';

type ContrastPreference = 'more' | 'less' | 'custom' | 'no-preference';

/**
 * Returns the contrast preference indicated by the `prefers-contrast` media feature.
 *
 * @returns {ContrastPreference | null} The document's preferred contrast
 */
export default function usePrefersContrast(): ContrastPreference | null {
  const prefersMoreContrast = useMatchMedia('(prefers-contrast: more)');
  const prefersLessContrast = useMatchMedia('(prefers-contrast: less)');
  const prefersCustomContrast = useMatchMedia('(prefers-contrast: custom)');

  if (
    prefersMoreContrast === null ||
    prefersLessContrast === null ||
    prefersCustomContrast === null
  ) {
    return null;
  }

  if (prefersMoreContrast) {
    return 'more';
  }

  if (prefersLessContrast) {
    return 'less';
  }

  if (prefersCustomContrast) {
    return 'custom';
  }

  return 'no-preference';
}
