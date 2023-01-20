import { renderHook } from '@testing-library/react-hooks';

import useIntersectionObserver from './useIntersectionObserver';

const itIfDocumentDefined = typeof document !== 'undefined' ? it : it.skip;

async function waitForAsync() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('useIntersectionObserver()', () => {
  const config = {};

  let observe: jest.Mock<typeof window.IntersectionObserver.prototype.observe>;
  let disconnect: jest.Mock<typeof window.IntersectionObserver.prototype.disconnect>;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      observe = jest.fn();
      disconnect = jest.fn();

      Object.defineProperty(window, 'IntersectionObserver', {
        configurable: true,
        enumerable: true,
        get: () => () => {
          // Intentionally empty
        },
      });

      const mockIntersectionObserver = jest.spyOn(window, 'IntersectionObserver');

      (
        mockIntersectionObserver as jest.SpyInstance<Partial<IntersectionObserver>>
      ).mockImplementation(() => ({
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

    const { result } = renderHook(() => useIntersectionObserver(null, config, listener));

    expect(result.current).toBe(undefined);
  });

  itIfDocumentDefined('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = () => {
      // Intentionally empty
    };

    renderHook(() => useIntersectionObserver(element, config, listener));

    await waitForAsync();

    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(window.IntersectionObserver).toHaveBeenCalledWith(listener, config);

    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element);
  });
});
