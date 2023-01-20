import { renderHook } from '@testing-library/react-hooks';

import useResizeObserver from './useResizeObserver';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

async function waitForAsync() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('useResizeObserver()', () => {
  const config = {};

  let observe: jest.Mock<typeof window.ResizeObserver.prototype.observe>;
  let disconnect: jest.Mock<typeof window.ResizeObserver.prototype.disconnect>;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      observe = jest.fn();
      disconnect = jest.fn();

      Object.defineProperty(window, 'ResizeObserver', {
        configurable: true,
        enumerable: true,
        get: () => () => {
          // Intentionally empty
        },
      });

      const mockResizeObserver = jest.spyOn(window, 'ResizeObserver');
      (mockResizeObserver as jest.SpyInstance<Partial<ResizeObserver>>).mockImplementation(() => ({
        observe,
        disconnect,
      }));
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does nothing given falsy element', () => {
    const listener = () => {
      // Intentionally empty
    };

    const { result } = renderHook(() => useResizeObserver(null, config, listener));

    expect(result.current).toBe(undefined);
  });

  itIfDocumentDefined('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = () => {
      // Intentionally empty
    };

    renderHook(() => useResizeObserver(element, config, listener));

    await waitForAsync();

    expect(window.ResizeObserver).toHaveBeenCalledTimes(1);
    expect(window.ResizeObserver).toHaveBeenCalledWith(listener);

    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element, config);
  });
});
