// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@testing-library/react-hooks': '@testing-library/react-hooks/server',
    },
  },
  test: {
    environment: 'node',
    setupFiles: 'vitest.setup.ts',
  },
});
