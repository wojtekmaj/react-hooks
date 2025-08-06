import { defineConfig } from 'vitest/config';

import type { ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'browser',
          environment: 'happy-dom',
          setupFiles: 'vitest.setup.ts',
        },
      },
      {
        test: {
          name: 'node',
          environment: 'node',
          setupFiles: ['vitest.setup.ts', 'vitest.setup.node.ts'],
        },
      },
    ],
    watch: false,
  },
});

export default config;
