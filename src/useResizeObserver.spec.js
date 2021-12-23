import { renderHook } from '@testing-library/react-hooks';

import useResizeObserver from './useResizeObserver';

describe('useResizeObserver()', () => {
  const config = {};

  let observe;
  let disconnect;

  beforeEach(() => {
    global.window.ResizeObserver = () => {};
    observe = jest.fn();
    disconnect = jest.fn();
    jest.spyOn(global.window, 'ResizeObserver').mockImplementation(() => ({
      observe,
      disconnect,
    }));
  });

  it('does nothing given falsy element', () => {
    const listener = () => {};

    const { result } = renderHook(() => useResizeObserver(null, config, listener));

    expect(result.current).toBe(undefined);
  });

  it('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = jest.fn();

    renderHook(() => useResizeObserver(element, config, listener));

    await new Promise((resolve) => resolve());

    expect(global.window.ResizeObserver).toHaveBeenCalledTimes(1);
    expect(global.window.ResizeObserver).toHaveBeenCalledWith(listener);

    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element, config);
  });
});
