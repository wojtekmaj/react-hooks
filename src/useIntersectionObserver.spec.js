import { renderHook } from '@testing-library/react-hooks';

import useIntersectionObserver from './useIntersectionObserver';

describe('useIntersectionObserver()', () => {
  const config = {};

  let observe;
  let disconnect;

  beforeEach(() => {
    global.window.IntersectionObserver = () => {};
    observe = jest.fn();
    disconnect = jest.fn();
    jest.spyOn(global.window, 'IntersectionObserver').mockImplementation(() => ({
      observe,
      disconnect,
    }));
  });

  it('attaches event listener to element properly', async () => {
    const element = document.createElement('div');
    const listener = jest.fn();

    renderHook(() => useIntersectionObserver(element, config, listener));

    await new Promise((resolve) => resolve());

    expect(global.window.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(global.window.IntersectionObserver).toHaveBeenCalledWith(listener, config);

    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(element);
  });
});
