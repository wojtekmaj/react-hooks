import { vi } from 'vitest';

import { renderHookServer } from './test-utils.js';

vi.mock('vitest-browser-react', async () => {
  return {
    renderHook: renderHookServer,
  };
});
