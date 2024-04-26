import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['vitest.setup.ts', 'vitest.setup.node.ts'],
    watch: false,
  },
});
