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

  let observe;
  let disconnect;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      global.window.ResizeObserver = () => {};

      observe = jest.fn();
      disconnect = jest.fn();

      jest.spyOn(global.window, 'ResizeObserver').mockImplementation(() => ({
        observe,
        disconnect,
      }));
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does nothing given falsy element', () => {
    const listener = () => {};

    const { result } = renderHook(() => useResizeObserver(null, config, listener));

    expect(result.current).toBe(undefined);
  });

  itIfDocumentDefined('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = jest.fn();

    renderHook(() => useResizeObserver(element, config, listener));

    await waitForAsync();

    expect(global.window.ResizeObserver).toHaveBeenCalledTimes(1);
    expect(global.window.ResizeObserver).toHaveBeenCalledWith(listener);

    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element, config);
  });
});
