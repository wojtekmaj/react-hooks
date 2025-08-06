import { defineConfig } from 'vitest/config';

import type { ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'browser',
          environment: 'happy-dom',
        },
      },
      {
        test: {
          name: 'node',
          environment: 'node',
          setupFiles: 'vitest.setup.node.ts',
        },
      },
    ],
    watch: false,
  },
});

export default config;
