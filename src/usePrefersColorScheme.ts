import usePrefersColorSchemeLight from './usePrefersColorSchemeLight.js';

/**
 * Returns the color scheme preference indicated by the `prefers-color-scheme` media feature.
 *
 * @returns {'dark' | 'light' | null} The document's preferred color scheme
 */
export default function usePrefersColorScheme(): 'dark' | 'light' | null {
  const prefersLightColorScheme = usePrefersColorSchemeLight();

  if (prefersLightColorScheme === null) {
    return null;
  }

  return prefersLightColorScheme ? 'light' : 'dark';
}
