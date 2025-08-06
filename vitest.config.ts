import { defineConfig } from 'vitest/config';

import type { ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'browser',
          browser: {
            enabled: true,
            headless: true,
            instances: [
              {
                browser: 'chromium',
                context: {
                  colorScheme: 'dark',
                  reducedMotion: 'reduce',
                  // TODO: Set when Playwright supports this feature
                  // reducedTransparency: 'reduce',
                },
              },
            ],
            provider: 'playwright',
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
