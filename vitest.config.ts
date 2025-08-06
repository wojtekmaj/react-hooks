import { defineConfig } from 'vitest/config';

import type { ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'browser',
          environment: 'happy-dom',
          environmentOptions: {
            happyDOM: {
              settings: {
                device: {
                  prefersColorScheme: 'dark',
                  prefersReducedMotion: 'reduce',
                  // See https://github.com/capricorn86/happy-dom/issues/1866
                  // prefersReducedTransparency: 'reduce',
                },
              },
            },
          },
        },
      },
      {
        test: {
          name: 'node',
          environment: 'node',
          setupFiles: 'vitest.setup.ts',
        },
      },
    ],
    watch: false,
  },
});

export default config;
