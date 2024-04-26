import { vi } from 'vitest';
import { renderHookServer } from './test-utils.js';

vi.mock('@testing-library/react', async () => {
  const actualTestingLibraryReact = await vi.importActual('@testing-library/react');

  return {
    ...actualTestingLibraryReact,
    renderHook: renderHookServer,
  };
});
