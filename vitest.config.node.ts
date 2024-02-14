import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@testing-library/react': '@testing-library/react/server',
    },
  },
  test: {
    environment: 'node',
    setupFiles: 'vitest.setup.ts',
    watch: false,
  },
});
