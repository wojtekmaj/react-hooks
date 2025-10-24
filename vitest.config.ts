import { playwright } from '@vitest/browser-playwright';
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
            instances: [{ browser: 'chromium' }],
            provider: playwright({
              contextOptions: {
                colorScheme: 'dark',
                reducedMotion: 'reduce',
                // TODO: Set when Playwright supports this feature
                // reducedTransparency: 'reduce',}
              },
            }),
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
