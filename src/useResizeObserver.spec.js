import { renderHook } from '@testing-library/react-hooks';

import useResizeObserver from './useResizeObserver';

describe('useResizeObserver()', () => {
  const config = {};

  it('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = jest.fn();

    global.window.ResizeObserver = () => {};
    const observe = jest.fn();
    const disconnect = jest.fn();
    jest.spyOn(global.window, 'ResizeObserver').mockImplementation(() => ({
      observe,
      disconnect,
    }));

    renderHook(() => useResizeObserver(element, config, listener));

    await new Promise((resolve) => resolve());

    expect(global.window.ResizeObserver).toHaveBeenCalledTimes(1);
    expect(global.window.ResizeObserver).toHaveBeenCalledWith(listener);

    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element, config);
  });
});
