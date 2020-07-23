import { renderHook } from '@testing-library/react-hooks';

import useEventListener from './useEventListener';

describe('useEventListener()', () => {
  it('attaches event listener to element properly', () => {
    const element = document.createElement('div');
    jest.spyOn(element, 'addEventListener');

    const type = 'click';
    const listener = () => {};

    renderHook(() => useEventListener(element, type, listener));

    expect(element.addEventListener).toHaveBeenCalledTimes(1);
    expect(element.addEventListener).toHaveBeenCalledWith(type, listener);
  });
});
